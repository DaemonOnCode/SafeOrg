from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
import numpy as np
import imutils
import time
import cv2
import os


def detect_and_predict_mask(frame, faceNet, maskNet):
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (224, 224),
                                 (104.0, 177.0, 123.0))

    faceNet.setInput(blob)
    detections = faceNet.forward()

    faces = []
    locs = []
    preds = []

    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            (startX, startY) = (max(0, startX), max(0, startY))
            (endX, endY) = (min(w - 1, endX), min(h - 1, endY))

            face = frame[startY:endY, startX:endX]
            face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
            face = cv2.resize(face, (224, 224))
            face = img_to_array(face)
            face = preprocess_input(face)

            faces.append(face)
            locs.append((startX, startY, endX, endY))

    if len(faces) > 0:
        faces = np.array(faces, dtype="float32")
        preds = maskNet.predict(faces, batch_size=32)

    return (locs, preds)


prototxtPath = "ML/FMD/deploy.prototxt"
weightsPath = "ML/FMD/res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

maskNet = load_model("ML/FMD/mask_detector.model")


def main(Path,path_to_new_VID):
    FaultFrames = []
    cap = cv2.VideoCapture(Path)

    vw = cv2.VideoWriter()
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = cap.get(cv2.CAP_PROP_FPS)
    size = (
        int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )
    if not vw.open(path_to_new_VID, fourcc, fps, size):
        print('failed to open video writer')
        return

    while(cap.isOpened()):
        ret, frame = cap.read()

        if not ret:
            break

        # if int(cap.get(cv2.CAP_PROP_POS_FRAMES)) < 450:
        #     continue

        (locs, preds) = detect_and_predict_mask(frame, faceNet, maskNet)

        for (box, pred) in zip(locs, preds):
            (startX, startY, endX, endY) = box
            (mask, withoutMask) = pred

            label = "Mask" if mask > withoutMask else "No Mask"

            if label == "Mask":
                FaultFrames.append(int(cap.get(cv2.CAP_PROP_POS_FRAMES)))

            color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

            label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

            cv2.putText(frame, label, (startX, startY - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
            cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

        #cv2.imshow("Frame", frame)
        vw.write(frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord("q"):
            break

    RemFaltyFrames = -1

x = main("ML/FMD/DontUse.mp4","ML/FMD/DontUseProcessed.mp4")
print(x)

    if FaultFrames != 0:
        RemFaltyFrames = [FaultFrames[0]]
        for i in range(len(FaultFrames) - 1):
            if(FaultFrames[i] + 1 != FaultFrames[i + 1]):
                RemFaltyFrames.append(FaultFrames[i+1])

    
    vw.release()   

    cv2.destroyAllWindows()
    return RemFaltyFrames


# x = main("ML/FMD/DontUse.mp4","ML/FMD/DontUseProcessed.mp4")
# print(x)
