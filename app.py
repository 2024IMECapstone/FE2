from flask import Flask, request, jsonify
import librosa
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os
from inference_with_falling import process_video_file

app = Flask(__name__)

# YAMNet 모델 로드 및 클래스 이름 리스트 설정
yamnet_model = hub.load('https://tfhub.dev/google/yamnet/1')
class_names = ["Crying, sobbing", "Baby cry, infant cry", "Babbling"]

saved_model_path = "./yamnet81model/"
reloaded_model = tf.saved_model.load(saved_model_path)

# 원하는 클래스 설정
desired_class = ["Crying, sobbing", "Baby cry, infant cry", "Babbling"]

# 기본 경로에 대한 핸들러 추가
@app.route('/')
def index():
    return "Welcome to the audio and video processing API"

@app.route('/process_audio')
def process_audio():
    # local_file_path = 'C:/Babystar/jilsik.wav'
    # if 'file' not in request.files:
    #     return jsonify({"error": "No file part"}), 400

    # file = request.files['file']
    # if file.filename == '':
    #     return jsonify({"error": "No selected file"}), 400
    local_file_path = "C:/Babystar/jilsik.wav"

    if not os.path.exists(local_file_path):
        return jsonify({"error": "File not found"}), 400

    try:
        # 파일을 librosa를 사용하여 로드
        wav, sample_rate = librosa.load(local_file_path, sr=16000, mono=True)

        # YAMNet 모델을 사용하여 예측
        scores, embeddings, spectrogram = yamnet_model(wav)
        scores_np = scores.numpy()
        top_classes_indices = scores_np.mean(axis=0).argsort()[-5:][::-1]

        found_desired_class = False
        detected_class = None
        for index in top_classes_indices:
            inferred_class = class_names[index]
            if inferred_class in desired_class:
                found_desired_class = True
                detected_class = inferred_class
                break

        if found_desired_class:
            my_classes = ['asphyxia', 'hunger', 'normal', 'pain', 'tired', 'discomfort']
            reloaded_results = reloaded_model(wav)
            crying_type = my_classes[tf.math.argmax(reloaded_results)]
            print(f'The main sound is: {crying_type}')
            return jsonify({"status": "detected", "class": detected_class, "cryingType": crying_type}), 200
        else:
            return jsonify({"status": "not_detected"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/process_video')
def process_video():
    local_file_path = 'C:/Babystar/video_detection/ajin/back1.mp4'
    if not os.path.exists(local_file_path):
        return jsonify({"error": "No file part"}), 400


    try:
        # 동영상 파일을 처리 및 결과를 반환
        results_summary = process_video_file(local_file_path)
        print(results_summary)
        return jsonify({"status": "processed", "results": results_summary}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
