from flask import Flask, request, jsonify
from utils import base64_to_pil_img, prepare_image
from tensorflow.keras.models import load_model

app = Flask(__name__)
model = load_model('C:/Users/whuan/Downloads/your_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    base64_img = data['image']
    print(base64_img)
    # Convert Base64 string to a PIL Image
    image = base64_to_pil_img(base64_img)
    
    # Preprocess the image and predict
    preprocessed_img = prepare_image(image, target_size=(224, 224))
    prediction = model.predict(preprocessed_img)
    
    # Process prediction and return response
    # Assuming you have a function to interpret the prediction result
    response = {'prediction': str(prediction)}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
