
path = "C:/Users/rkrao/OneDrive/Documents/inference_images/merged"


import os
import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.image import save_img
from PIL import Image
i=0
for img_path in os.listdir(path):
    img = load_img(path + '/' + img_path)
    img = img.resize((512,256))
    img = img_to_array(img)
    img = img[:,:256]
    i+=1
    save_img(f"C:/Users/rkrao/OneDrive/Documents/inference_images/new/{i}.jpg",img_to_array(img))

# img = Image.open("C:/Users/rkrao/OneDrive/Documents/inference_images/new/1.jpg")
# model = load_model("C:/Users/rkrao/Downloads/model_109600.h5")
# img = np.asarray(img)
# img = (img-127.5)/127.5
# img = np.expand_dims(img,axis=0)
# print(img.shape)
# pred_img = model.predict(img)
# import matplotlib.pyplot as plt
# pred_img[0] = (pred_img[0] + 1)/2.0
# cv2.imwrite("C:/Users/rkrao/OneDrive/Documents/inference_images/new/pred.jpg",pred_img[0])

