# File: utils.py
import base64
from io import BytesIO
from PIL import Image
import numpy as np

def base64_to_pil_img(base64_img):
    """Converts a Base64-encoded image to a PIL Image object."""
    image_data = base64.b64decode(base64_img)
    image = Image.open(BytesIO(image_data))
    return image

def prepare_image(image, target_size):
    """Preprocess the image for model prediction."""
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image_array = np.asarray(image)
    image_array = image_array / 255.0  # Normalize to [0,1]
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array
