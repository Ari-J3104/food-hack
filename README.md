# food-hack

## Letting outside devices access the server
1. Install [ngrok](https://ngrok.com/download)
2. Run `ngrok http 3000`

## Launching the backend
1. cd into the *backend* folder
2. run `npm i`
3. Rename `.env.example` to `.env` with the api keys
4. run `node main.js`
This server is running on port **8000**


## Launching the dev front end
1. cd into the *client/my-app* folder
2. run `npm i`
3. run `npm start`
This client server is running on port **3000**
This server has a proxy to the backend at _http://localhost:8000_

## Lauching the python flask model
1. cd into *AiTraining*
2. Install all the dependencies (glhf)
3. run `flask run`



## Inspiration

We wanted to create a project that implemented the categories we were all interested in, like UI/UX, Machine learning, AI, and Data Analysis.

One of our group members mentioned how we could do a project on generative AI, which sparked the discussion about what we could have it generate. Our first thought was to scan shoes and find their price via scanning, however, after further discussion, something even more elegant came up. One of our members was hungry and he and his friends really care about the protein count in their food and always had to ask or search up the macros of his food before getting something. So, he thought that it would be awesome if he could scan food and get the nutrient facts of it just by hovering his phone over it. The perfect merge of all of our groups' computer science interests was born, and now we have our proudest project to show for it! 


## What it does

Our web app, Foodi™️, can scan common types of food and recognize the food item, as well as give essential nutritional facts straight from a food label database. It’s easy to use and get running, and we have plans to continue working on it and hope for it to be useful to others. 

## How we built it
Using the Food101 dataset we trained an AI model from scratch using Python and the machine learning libraries of TensorFlow and Keras. For the client handling, we built a React frontend with a node.js server backend. The node.js server handles the API requests between the client and the AI Model and formats the website using CSS for all devices.

## Challenges we ran into
The model took a while to train from scratch using TensorFlow, about 7 hours. Dependency issues, merging the front and back ends, and getting the nutrition fact data. There were also some hiccups with 
 integrating the trained AI model with the server and the front end to work with the phone formatting.

## Accomplishments that we're proud of
Getting the front end working with the back-end interface. Getting the project done and functioning as intended. Training the AI model from scratch effectively with accurate results.

## What we learned
We learned from each of our specialties, whether they be UI/UX design, web development, Machine Learning, or data science, and congregated them to create something we found special. We learned a ton from each other and the importance of each of our individual experiences. 


## What's next for Foodi
More training for our AI. We plan on implementing more images of various food items and our web app will continue to seamlessly learn and scan food items!


## Current list of scanable foods
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