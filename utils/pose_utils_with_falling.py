import numpy as np
import cv2
def get_kpt_coordinate(kpts):    
    nose = kpts[0]
    left_eye, right_eye = kpts[1], kpts[2]
    left_ear, right_ear = kpts[3], kpts[4]
    left_shoulder, right_shoulder = kpts[5], kpts[6]
    left_elbow, right_elbow = kpts[7], kpts[8]
    left_wrist, right_wrist = kpts[9], kpts[10]
    left_hip, right_hip = kpts[11], kpts[12]
    left_knee, right_knee = kpts[13], kpts[14]
    left_ankle, right_ankle = kpts[15], kpts[16]
    
    return nose, left_eye, right_eye, left_ear, right_ear, left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist, left_hip, right_hip, left_knee, right_knee, left_ankle, right_ankle


def get_pose_direction(bbox, kpts):
    center_x, center_y, w, h = bbox[0], bbox[1], bbox[2], bbox[3]
    nose, left_eye, right_eye, left_ear, right_ear, left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist, left_hip, right_hip, left_knee, right_knee, left_ankle, right_ankle = get_kpt_coordinate(kpts)
    
    face = [nose, left_eye, right_eye, left_ear, right_ear]

    if w < h: # vertical
        if all(face_part[1] < center_y for face_part in face): # 머리가 위쪽에 있는 경우
            pose_direction = 'up'
        else: # 머리가 아래쪽에 있는 경우
            pose_direction = 'down'
    else: # horizontal
        if all(face_part[0] < center_x for face_part in face): # 머리가 왼쪽에 있는 경우
            pose_direction = 'left'
        else: # 머리가 오른쪽에 있는 경우
            pose_direction = 'right'

    return pose_direction


def get_pose_status(bbox, kpts):
    pose_direction = get_pose_direction(bbox, kpts)
    
    nose, left_eye, right_eye, left_ear, right_ear, left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist, left_hip, right_hip, left_knee, right_knee, left_ankle, right_ankle = get_kpt_coordinate(kpts)
    
    if pose_direction == 'up':
        is_lying_side = (all(wrist > right_shoulder[0] for wrist in (left_wrist[0], right_wrist[0]))) or (all(wrist < left_shoulder[0] for wrist in (left_wrist[0], right_wrist[0]))) # 왼쪽 or 오른쪽으로 누운 자세

        #is_lying_back = (left_elbow[0] < left_shoulder[0]) and (right_elbow[0] > right_shoulder[0]) and ((left_shoulder[0] < right_shoulder[0]) and (left_hip[0] < right_hip[0])) # 뒤집혀서 누운 자세
        is_lying_back = ((left_shoulder[0] < right_shoulder[0]) and (left_hip[0] < right_hip[0])) # 뒤집혀서 누운 자세
        if is_lying_side: # 옆으로 누운 자세
            pose_status = "Bad Sleeping Pose"
        elif is_lying_back: # 완전 뒤집힌 자세
            pose_status = "Dangerous Sleeping Pose"
        else: # 정상 자세
            pose_status = "Normal Sleeping Pose"
    else: # pose_direction is 'down' or 'left' or 'right'
        pose_status = 'Wrong Pose Direction'
        
    return pose_status
    
def point_in_boundary(point, boundary_points): 
    return cv2.pointPolygonTest(boundary_points, (point[0], point[1]), False) >= 0 #점이 다각형 내부, 외부 또는 경계 위에 있는지를 나타내는 값을 반환
    #1: 점이 다각형 내부
    #0: 점이 다각형 경계
    #-1: 점이 다각형 외부
  
def get_falling(kpts, boundary, threshold=0.6):
    nose, left_eye, right_eye, left_ear, right_ear, left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist, left_hip, right_hip, left_knee, right_knee, left_ankle, right_ankle = get_kpt_coordinate(kpts)
    rect = [left_shoulder, right_shoulder, right_hip, left_hip]
    # print("rect", rect)
    # 유효한 점들만 남기기
    rect = [point for point in rect if point[2] > 0]  #rect 좌표의 구성 : (x, y, confidence)

    rect_points = np.array([(point[0], point[1]) for point in rect], dtype=np.float32)
    boundary_points = np.array(boundary, dtype=np.float32)

    # 사각형의 넓이 계산
    rect_area = cv2.contourArea(rect_points)
    
    # 사각형과 경계의 교차 영역 계산
    intersect_polygon = cv2.intersectConvexConvex(rect_points, boundary_points)[1]
    if intersect_polygon is None or len(intersect_polygon) < 3:
        intersect_area = 0
    else:
        intersect_area = cv2.intersectConvexConvex(rect_points, boundary_points)[0]
    # print("rect_area 넓이", rect_area)
    # print("intersect_area 넓이", intersect_area)
    outside_ratio = (rect_area-intersect_area) / rect_area
    
    face_points = [nose, left_eye, right_eye, left_ear, right_ear]
    face_outside = all(not point_in_boundary(point, boundary_points) for point in face_points if point[2] > 0)#키포인트가 모두 경계 밖에 있으면 True, 아닐 경우 False

    #print(outside_ratio)
    if face_outside and outside_ratio > threshold:
        falling_status = "Falling"
    elif face_outside and outside_ratio <= threshold :
        falling_status = "Falling Risk"
    elif outside_ratio > threshold :
        falling_status = "Falling Risk"
    else:
        falling_status = "Normal"

    return falling_status
    
# def get_falling(kpts, boundary, threshold = 0.4) :
#     nose, left_eye, right_eye, left_ear, right_ear, left_shoulder, right_shoulder, left_elbow, right_elbow, left_wrist, right_wrist, left_hip, right_hip, left_knee, right_knee, left_ankle, right_ankle = get_kpt_coordinate(kpts)
#     rect = [left_shoulder, right_shoulder, right_hip, left_hip]
#     rect_points = np.array(rect, dtype = np.float32)
#     boundary_points = np.array(boundary, dtype=np.float32)
#     if rect_points.size == 0 or boundary_points.size == 0:
#         return "Falling can't be detected."  # 빈 배열이면 "Normal" 반환
#     rect_polygon = cv2.convexHull(rect_points)
#     boundary_polygon = cv2.convexHull(boundary_points)
#     intersect_area = cv2.intersectConvexConvex(rect_polygon, boundary_polygon)[0]
#     rect_area = cv2.contourArea(rect_polygon)
    
#     outside_ratio = (rect_area - intersect_area) / rect_area
#     if outside_ratio > threshold : 
#         falling_status = "Falling"
#     else :
#         falling_status = "Normal"
    
#     return falling_status
