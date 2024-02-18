import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Set the path to your dataset
dataset_dir = 'C:/Users/whuan/Downloads/archive/food-101/food-101/images'

# Initialize the ImageDataGenerator for training
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,  # Using 20% of the data for validation
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Prepare the training and validation generators
train_generator = train_datagen.flow_from_directory(
    dataset_dir,
    target_size=(224, 224),  # MobileNetV2 default image size
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    dataset_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# Load MobileNetV2 as the base model
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze the base model
base_model.trainable = False

# Add custom layers on top for the Food-101 classification task
x = base_model.output
x = GlobalAveragePooling2D()(x)
predictions = Dense(101, activation='softmax')(x)

# Compile the model with the corrected parameter for the optimizer
model = Model(inputs=base_model.input, outputs=predictions)
model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

epochs = 10  # Number of epochs to train the model

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    epochs=epochs
)


# Convert the training history to a JSON file
# After training, save the model to disk in the Downloads folder
model.save('C:/Users/whuan/Downloads/your_model.h5')

# Convert the training history to a JSON file and save it in the Downloads folder
json.dump(history.history, open('C:/Users/whuan/Downloads/training_history.json', 'w'))

