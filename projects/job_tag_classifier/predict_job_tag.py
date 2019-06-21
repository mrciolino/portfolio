from keras import models
import pickle as pkl
import pandas as pd
import os

sys.path.append("Job Tag Classifier Tools")
from Pipeline import DataLoader, tag_decoder


def run_predictions(input):

    # save the passed job description and job title to a csv file to pass to dataloader


    # load our data into X and Y
    X, _, Y, _ = DataLoader("train_file.csv", test_size=0)

    # encode the input
    encoder = models.load_model("Models/encoder_model")
    X_encoded = encoder.predict(X)

    # load the classifier
    model = models.load_model("Models/classifier_model")
    list_of_indices = model.predict(X_encoded)

    # decode the target back into tags
    predicition = tag_decoder(list_of_indices, threshold=.2)

    return predicition
