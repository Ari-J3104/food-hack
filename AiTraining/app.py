from flask import Flask, request, jsonify
from utils import base64_to_pil_img, prepare_image
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the pre-trained model here
model = load_model('foodi_finetuned_model.h5')

# Full list of class names for the Food-101 dataset
class_names = [
    'apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio', 'beef_tartare', 
    'beet_salad', 'beignets', 'bibimbap', 'bread_pudding', 'breakfast_burrito', 
    'bruschetta', 'caesar_salad', 'cannoli', 'caprese_salad', 'carrot_cake', 
    'ceviche', 'cheesecake', 'cheese_plate', 'chicken_curry', 'chicken_quesadilla', 
    'chicken_wings', 'chocolate_cake', 'chocolate_mousse', 'churros', 'clam_chowder', 
    'club_sandwich', 'crab_cakes', 'creme_brulee', 'croque_madame', 'cup_cakes', 
    'deviled_eggs', 'donuts', 'dumplings', 'edamame', 'eggs_benedict', 
    'escargots', 'falafel', 'filet_mignon', 'fish_and_chips', 'foie_gras', 
    'french_fries', 'french_onion_soup', 'french_toast', 'fried_calamari', 'fried_rice', 
    'frozen_yogurt', 'garlic_bread', 'gnocchi', 'greek_salad', 'grilled_cheese_sandwich', 
    'grilled_salmon', 'guacamole', 'gyoza', 'hamburger', 'hot_and_sour_soup', 
    'hot_dog', 'huevos_rancheros', 'hummus', 'ice_cream', 'lasagna', 
    'lobster_bisque', 'lobster_roll_sandwich', 'macaroni_and_cheese', 'macarons', 'miso_soup', 
    'mussels', 'nachos', 'omelette', 'onion_rings', 'oysters', 
    'pad_thai', 'paella', 'pancakes', 'panna_cotta', 'peking_duck', 
    'pho', 'pizza', 'pork_chop', 'poutine', 'prime_rib', 
    'pulled_pork_sandwich', 'ramen', 'ravioli', 'red_velvet_cake', 'risotto', 
    'samosa', 'sashimi', 'scallops', 'seaweed_salad', 'shrimp_and_grits', 
    'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake', 
    'sushi', 'tacos', 'takoyaki', 'tiramisu', 'tuna_tartare', 
    'waffles'
]

def interpret_prediction(prediction):
    """Convert model prediction probabilities to a human-readable label."""
    # Get the index of the highest probability
    predicted_class_idx = np.argmax(prediction, axis=-1)[0]
    # Retrieve the class label
    return class_names[predicted_class_idx]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    base64_img = data['image']
    
    # Convert Base64 string to a PIL Image
    image = base64_to_pil_img(base64_img)
    
    if image is None:
        return jsonify({'error': 'Invalid image data'}), 400

    # Preprocess the image and predict
    preprocessed_img = prepare_image(image, target_size=(224, 224))
    prediction = model.predict(preprocessed_img)
    
    # Interpret the prediction result
    predicted_class = interpret_prediction(prediction)
    
    # Return the response with the predicted class
    response = {'prediction': predicted_class}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
