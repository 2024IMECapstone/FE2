import cv2
import time
import numpy as np
from ultralytics import YOLO

from utils.pose_utils_with_falling import get_pose_status, get_falling
from utils.text_utils_with_falling import calculate_fps, put_text

model = YOLO('C:/Babystar/video_detection/ajin/model/best_custom1360.pt') # Base Model
#model = YOLO('/home/sju/yl/runs/pose/train4/weights/last.pt') # Fine-Tuned Model

# Open the input video file
# video_path = "rtsp://210.99.70.120:1935/live/cctv001.stream" # RSTP Sample
#video_path = "/Users/kim-yelin/Desktop/세종대/4-1/capstone/babyposeinlocal/falling.mov" # Test
# video_path = "C:/Babystar/video_detection/ajin/back1.mp4" # Test
#video_path = "/home/sju/yl/babytestimage.png" # Test
def process_video_file(video_path):
    cap = cv2.VideoCapture(video_path)


    resize_ratio = 0.7
    wrong_stack, danger_stack, fall_stack = 0, 0, 0 # Stack
    stack_th = 100 # Stack Threshold
    f_stack_th = 50
    results_summary = []

    # Loop through the video frames

    # 요람 경계 설정 (고정된 좌표)
    crib_boundary = [(150, 250), (600, 250), (600, 950), (150, 950)]

    while cap.isOpened():
        # Read a frame from the video
        success, frame = cap.read()

        if (success) :
            fps_str = calculate_fps()
            #print("crib_boundary 넓이", crib_boundary)
            frame = cv2.resize(frame, (int(frame.shape[1]*resize_ratio), int(frame.shape[0]*resize_ratio)))
            results = model(frame, stream=True, conf=0.7, verbose=False) # YOLOv8 inference on the frame

            for result in results:
                result = result.cpu().numpy()
                result_boxes = result.boxes  # BBoxes for outputs
                result_kpts = result.keypoints # Keypoints for outputs

            try: # 예외 처리 부분
                first_box = result_boxes.xywh[0] # first_box : (4) : (Center x, Center y, w, h)
                first_kpts = result_kpts.data[0] # first_kpts : (17, 3) : (17 kpts, (x, y, conf))

            except Exception as e: # 예외 발생 o
                pose_status = "No Infant Detected."
                falling_status = "No falling Detected."
                wrong_stack += 1 # wrong_stack 1 증가

            else: # 예외 발생 x
                pose_status = get_pose_status(first_box, first_kpts)

                # if 'Wrong' in pose_status: # 'Wrong' in pose_status
                #     wrong_stack += 1 # wrong_stack 1 증가
                if 'Bad' or 'Dangerous' or 'Normal' in pose_status: # 'Bad' or 'Dangerous' or 'Normal' in pose_status
                    wrong_stack = max(0, wrong_stack - 1) # wrong_stack 1 감소 (최소: 0)

                    warning_type = ['Bad', 'Dangerous']
                    if any(warning in pose_status for warning in warning_type): # 'Bad' or 'Dangerous' in pose_status
                        danger_stack += 1 # danger_stack 1 증가
                    else: # 'Normal' in pose_status
                        danger_stack = max(0, danger_stack - 1) # danger_stack 1 감소 (최소: 0)

                #낙상 여부 판별
                falling_status = get_falling(first_kpts, crib_boundary)
                if falling_status == "Falling" or falling_status == "Falling Risk":
                    fall_stack += 1 # fall_stack 1 증가
                else:
                    fall_stack = max(0, fall_stack - 1) # fall_stack 1 감소 (최소: 0)


            finally: # stack이 stack_th에 도달하면 stack을 초기화하고 사용자에게 알림 전송
                if wrong_stack == stack_th:
                    wrong_stack = 0 # w_stack 초기화
                    results_summary.append("아기 확인 불가")
                    print("아기 확인 불가")

                if danger_stack == stack_th:
                    danger_stack = 0 # d_stack 초기화
                    results_summary.append("뒤집기 자세")
                    print("뒤집기 자세")

                if fall_stack == f_stack_th:
                    fall_stack = 0 # fall_stack 초기화
                    results_summary.append("낙상 위험 감지")
                    print("낙상 위험 감지")

            # Visualize the results and put text on the frame -> annotated_frame
            annotated_frame = result.plot(labels=False)
            cv2.polylines(annotated_frame, [np.array(crib_boundary)], isClosed=True, color=(255, 0, 0), thickness=2)
            # annotated_frame = cv2.resize(annotated_frame, (int(frame.shape[1]*resize_ratio), int(frame.shape[0]*resize_ratio)))
            annotated_frame = put_text(annotated_frame, fps_str, pose_status, wrong_stack, danger_stack, stack_th, falling_status, fall_stack, f_stack_th)

            # Display the annotated frame
            cv2.imshow("Infant Pose Detection", annotated_frame)

            # time.sleep(0.01)
            # Break the loop if 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        else:
            # Break the loop if the end of the video is reached
            break

    # Release the video capture object and close the display window
    cap.release()
    cv2.destroyAllWindows()
    return results_summary