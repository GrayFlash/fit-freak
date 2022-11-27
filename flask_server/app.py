from flask import Flask, request, jsonify
import numpy as np
import pickle
import cv2
import requests
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose
from PIL import Image
import io
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

landmark_lines = [[16, 14, 12], # Right Arm
                [11, 13, 15], # Left Arm
                [24, 26, 28], # Right Leg
                [23, 25, 27], # Left Leg
                [12, 24, 26], # Right waist
                [11, 23, 25]] # Left waist

map_points = {11: mp_pose.PoseLandmark.LEFT_SHOULDER,
            12: mp_pose.PoseLandmark.RIGHT_SHOULDER,
            13: mp_pose.PoseLandmark.LEFT_ELBOW,
            14: mp_pose.PoseLandmark.RIGHT_ELBOW,
            15: mp_pose.PoseLandmark.LEFT_WRIST,
            16: mp_pose.PoseLandmark.RIGHT_WRIST,
            23: mp_pose.PoseLandmark.LEFT_HIP,
            24: mp_pose.PoseLandmark.RIGHT_HIP,
            25: mp_pose.PoseLandmark.LEFT_KNEE,
            26: mp_pose.PoseLandmark.RIGHT_KNEE,
            27: mp_pose.PoseLandmark.LEFT_ANKLE,
            28: mp_pose.PoseLandmark.RIGHT_ANKLE
            }


# @app.route("/upload-base-pose", methods=["POST"])
def upload_base_img():
    # data = request.get_json(force=True)
    # print(data)
    img_url = "https://res.cloudinary.com/ddtoohmjx/image/upload/v1667640994/downdog1_k4xwck.jpg"
    response = requests.get(img_url)
    img = Image.open(io.BytesIO(response.content))
    # arr = np.asarray(bytearray(img), dtype=np.uint8)
    # img = cv2.imdecode(arr, -1) # 'Load it as it is'
    # cv2.imshow('lalala', img)
    img.save("tmp.jpg")
    image = cv2.imread("tmp.jpg", 1)
    image_height, image_width, _ = image.shape

    print("image size: ", image_height, "x", image_width)
    
    # Convert the BGR image to RGB before processing.
    BG_COLOR = (192, 192, 192) # gray
    with mp_pose.Pose(
        static_image_mode=True,
        model_complexity=2,
        enable_segmentation=True,
        min_detection_confidence=0.5) as pose:
        results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

        if not results.pose_landmarks:
            print("Could not obtain landmark points")
            return
        # print(results.pose_landmarks[0])
        print(type(results.pose_landmarks))
        for i in landmark_lines:
            a = results.pose_landmarks.landmark[map_points[i[0]]]
            b = results.pose_landmarks.landmark[map_points[i[1]]]
            c = results.pose_landmarks.landmark[map_points[i[2]]]
            calc_angle(a, b, c)
    return { "image_url": "some-url-to-load", "error": "none"}

@app.route("/predict-pose-acc", methods=["POST"])
def compare_with_base():
    data = request.get_json(force=True)
    print(data)
    img_url = data['img']
    base_img_url = data['base_img']
    res1 = requests.get(img_url)
    res2 = requests.get(base_img_url)
    curr_img = Image.open(io.BytesIO(res1.content))
    base_img = Image.open(io.BytesIO(res2.content))
    curr_img.save("curr.jpg")
    base_img.save("base.jpg")
    curr_image = cv2.imread("curr.jpg", 1)
    base_image = cv2.imread("base.jpg", 1)
    BG_COLOR = (192, 192, 192) # gray
    arr = []
    with mp_pose.Pose(
        static_image_mode=True,
        model_complexity=2,
        enable_segmentation=True,
        min_detection_confidence=0.5) as pose:
        base_results = pose.process(cv2.cvtColor(base_image, cv2.COLOR_BGR2RGB))
        curr_results = pose.process(cv2.cvtColor(curr_image, cv2.COLOR_BGR2RGB))

        if not base_results.pose_landmarks or not curr_results.pose_landmarks:
            print("Could not obtain landmark points")
            return
        for i in landmark_lines:
            angle1 = calc_angle(base_results, i)
            angle2 = calc_angle(curr_results, i)
            if(abs(angle1-angle2) >= 8):
                arr.append("incorrect")
            else:
                arr.append("correct")
            print(i, ": -> ", angle1, angle2)
    resp = {}
    resp["right_arm"] = arr[0]
    resp["left_arm"] = arr[1]
    resp["right_leg"] = arr[2]
    resp["left_leg"] = arr[3]
    resp["right_waist"] = arr[4]
    resp["left_waist"] = arr[5]

    print(resp)
    return resp


def calc_angle(results, i):
    a = results.pose_landmarks.landmark[map_points[i[0]]]
    b = results.pose_landmarks.landmark[map_points[i[1]]]
    c = results.pose_landmarks.landmark[map_points[i[2]]]
    angle_ab = math.atan((a.y-b.y)/(a.x-b.x))*180/3.142
    angle_bc = math.atan((c.y-b.y)/(c.x-b.x))*180/3.142
    angle_net = angle_ab-angle_bc
    return abs(angle_net)

def main():
    print(compare_with_base())

if __name__ == '__main__':
    main()