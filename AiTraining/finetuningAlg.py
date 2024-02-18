import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import Adam

# Where's the food at? Here's our dataset's address.
dataset_dir = 'C:/Users/whuan/Downloads/archive/food-101/food-101/images'

# Spicing up our images with a bit of data augmentation magic
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,  # Let's hold back 20% as our tasting panel
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Prepping our training and validation sets
train_generator = train_datagen.flow_from_directory(
    dataset_dir,
    target_size=(224, 224),  # Just the right size for MobileNetV2
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

# Time to bring back our culinary expert, the pre-trained model
model = load_model('C:/Users/whuan/Downloads/your_model.h5')

# Let's not hold back any layer from learning new tricks
model.trainable = True

# We're going in with a fine brush this time, using a lower learning rate
optimizer = Adam(learning_rate=1e-5)

model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

# Fine-tuning time: like a short, intense cooking course for our model
epochs_fine_tuning = 4  # Just a few epochs should do

fine_tune_history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    epochs=epochs_fine_tuning
)

# Save the fine-tuned model and its history
model.save('C:/Users/whuan/Downloads/foodi_finetuned_model.h5')

json.dump(fine_tune_history.history, open('C:/Users/whuan/Downloads/fine_tuning_history.json', 'w'))
