from fastapi import FastAPI,UploadFile,File
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from io import BytesIO
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
import base64
import time
import io
import uvicorn
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import save_img
from numpy import expand_dims
import tensorflow as tf
import numpy as np

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image: str

model = load_model('./model_109600.h5')

def load_image(pixels, size=(256,256)):
    # pixels = load_img(filename, target_size=size)
    pixels = pixels.resize(size)
    pixels = img_to_array(pixels)
    # pixels = pixels[:,:256]
    pixels = (pixels - 127.5) / 127.5
    pixels = expand_dims(pixels, 0)
    return pixels


@app.get('/')
def hi():
    return "Hello"

@app.post("/predict")
async def process_image(file: UploadFile = File(...)):
    start_time = time.time()
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    # print(image.size)
    processed_image = load_image(image)
    orig_img = np.copy(processed_image)
    preds=model.predict(processed_image)
    output = tf.reshape(preds,[256,256,3])
    original = tf.reshape(orig_img,[256,256,3])
    # print(output==original)
    original = (original+1)/2.0
    output = (output+1)/2.0
    outputimg = 'xyz.png'
    originalimg = 'xyz_orig.png'
    save_img(outputimg,img_to_array(output))
    save_img(originalimg,img_to_array(original))
    # import base64
    with open(outputimg, "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
    with open(originalimg, "rb") as orig_img_file:
        orig_string = base64.b64encode(orig_img_file.read())
    total_time = time.time() - start_time
    print(total_time)
    response ={
        "image" : my_string,
        "orig_image": orig_string,
        "total_time" : total_time
    }
    return response
    
    # return StreamingResponse(buffered, media_type="image/jpeg")

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=3001)

