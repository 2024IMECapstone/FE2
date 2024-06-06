import cv2
import time
import numpy as np
import os
from ultralytics import YOLO

from utils.pose_utils import get_pose_status, get_falling
from utils.text_utils import calculate_fps, put_text

model = YOLO('yolov8m-pose.pt') # Base Model

# Directory containing images
image_dir = "/path/to/your/image/directory"
output_dir = "/path/to/your/output/directory"
os.makedirs(output_dir, exist_ok=True)

resize_ratio = 0.7
wrong_stack, danger_stack, fall_stack = 0, 0, 0 # Stack
stack_th = 300 # Stack Threshold
f_stack_th = 100
frame_num = 0
# 요람 경계 설정 (고정된 좌표)
crib_boundary = [(139, 67), (139, 246), (343, 246), (343, 67)]

# List all files in the directory
image_files = [f for f in os.listdir(image_dir) if os.path.isfile(os.path.join(image_dir, f))]

for image_file in image_files:
    # Read the image
    image_path = os.path.join(image_dir, image_file)
    frame = cv2.imread(image_path)
    
    if frame is not None:
        fps_str = calculate_fps()
        frame = cv2.resize(frame, (int(frame.shape[1]*resize_ratio), int(frame.shape[0]*resize_ratio)))
        results = model(frame, stream=True, conf=0.7, verbose=False) # YOLOv8 inference on the frame
        
        for result in results:
            result = result.cpu().numpy()
            result_boxes = result.boxes  # BBoxes for outputs
            result_kpts = result.keypoints # Keypoints for outputs
        
        try:
            first_box = result_boxes.xywh[0] # first_box : (4) : (Center x, Center y, w, h)
            first_kpts = result_kpts.data[0] # first_kpts : (17, 3) : (17 kpts, (x, y, conf))
            
        except Exception as e:
            pose_status = "No Infant Detected."
            falling_status = "No falling Detected."
            wrong_stack += 1 # wrong_stack 1 증가
            
        else:
            pose_status = get_pose_status(first_box, first_kpts)
            
            if 'Wrong' in pose_status:
                wrong_stack += 1
            else:
                wrong_stack = max(0, wrong_stack - 1)
                warning_type = ['Bad', 'Dangerous']
                if any(warning in pose_status for warning in warning_type):
                    danger_stack += 1
                else:
                    danger_stack = max(0, danger_stack - 1)

            falling_status = get_falling(first_kpts, crib_boundary)
            if falling_status == "Falling" or falling_status == "Falling Risk":
                fall_stack += 1
            else:
                fall_stack = max(0, fall_stack - 1)
                
        finally:
            if wrong_stack == stack_th:
                wrong_stack = 0
                print("아이 미탐지")
                
            if danger_stack == stack_th:
                danger_stack = 0
                print("비정상 수면 자세")
                
            if fall_stack == f_stack_th:
                fall_stack = 0
                print("낙상 위험 감지")
            
        # Visualize the results and put text on the frame -> annotated_frame
        annotated_frame = result.plot(labels=False)
        cv2.polylines(annotated_frame, [np.array(crib_boundary)], isClosed=True, color=(255, 0, 0), thickness=2)
        annotated_frame = put_text(annotated_frame, fps_str, pose_status, wrong_stack, danger_stack, stack_th, falling_status, fall_stack, f_stack_th)
       
        # Save the annotated frame
        output_path = os.path.join(output_dir, f"{frame_num:03d}.jpg")
        cv2.imwrite(output_path, annotated_frame)
        frame_num += 1
        time.sleep(0.01)
        

