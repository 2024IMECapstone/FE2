import pyaudio
import wave
from flask import Flask, request, jsonify
import librosa
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os
import pandas as pd

app=Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the audio processing API"

@app.route('/process_audio')
def process_audio():
    # PyAudio 객체 초기화
    p = pyaudio.PyAudio()

# 입력 장치 목록 출력
    print("Available input devices:")
    for i in range(p.get_device_count()):
        dev = p.get_device_info_by_index(i)
        if dev['maxInputChannels'] > 0:
            print(f"Device {i}: {dev['name']}")

# 사용자가 입력 장치를 선택하도록 요청
    #device_index = int(input("Select the device index: "))
    device_index = 1

# 오디오 설정
    format = pyaudio.paInt16
    channels = 1
    rate = 44100
    duration = 5  # 초

# 필요한 프레임 수 계산
    frames_per_buffer = 1024
    print("Recording...")
# 스트림 열기
    stream = p.open(format=pyaudio.paInt16,
                channels=1,
                rate=44100,
                input=True,
                input_device_index=device_index,
                frames_per_buffer=rate * duration)

# 데이터 읽기
    data = stream.read(rate*duration)
    print("Recording finished.")
# 스트림 종료
    stream.stop_stream()
    stream.close()

# PyAudio 종료
    p.terminate()

# 오디오 파일로 저장
    output_file = "output.wav"
    wf = wave.open(output_file, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(format))
    wf.setframerate(rate)
    wf.writeframes(data)
    wf.close()

    yamnet_model = hub.load('https://tfhub.dev/google/yamnet/1')
    class_map_path = yamnet_model.class_map_path().numpy().decode('utf-8')
    class_names =list(pd.read_csv(class_map_path)['display_name'])


    saved_model_path="./yamnet81model/"
    reloaded_model = tf.saved_model.load(saved_model_path)
    desired_class = ["Crying, sobbing", "Baby cry, infant cry", "Babbling"]
    wav, sample_rate = librosa.load(output_file, sr=16000, mono=True)

    # YAMNet 모델을 사용하여 예측
    scores, embeddings, spectrogram = yamnet_model(wav)
    scores_np = scores.numpy()
    top_classes_indices = scores_np.mean(axis=0).argsort()[-5:][::-1]
    try:
        found_desired_class = False
        detected_class = None
        for index in top_classes_indices:
            inferred_class = class_names[index]
            if inferred_class in desired_class:
                found_desired_class = True
                detected_class = inferred_class
                break

        if found_desired_class:
            # my_classes=['asphyxia','hunger','normal','pain','tired','discomfort']
            my_classes=['질식사','배고픔','보통','고통','피곤함','불편함']
            reloaded_results = reloaded_model(wav)
            crying_type = my_classes[tf.math.argmax(reloaded_results)]
            print(f'The main sound is: {crying_type}')
            os.remove(output_file)  # 임시 파일 삭제
            return jsonify({"status": "detected", "cryingType" : crying_type}), 200
        else:
            print("not_detected")
            return jsonify({"status": "not_detected"}), 200

    except Exception as e:
        print(e)
        print("error")
        return jsonify({"error": str(e)}), 500


if __name__=='__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)