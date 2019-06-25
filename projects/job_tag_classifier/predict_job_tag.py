from keras import models
import pandas as pd
import sys

sys.path.append("projects/job_tag_classifier/Job Tag Classifier Tools")
from Pipeline import tag_decoder
from FeatureCreation import feature_creation
from FeatureProcessing import feature_processing
from sklearn.model_selection import train_test_split


def run_predictions(input):

    def load_data(title, description):
        # make dataframe structue and fill in the description and title and other fillers
        data = {'job_id': 'N/A',
                'job_title': title,
                'job_description': description,
                'company_id': 'N/A',
                'company_name': 'N/A',
                'job_tag_id': 'N/A',
                'job_tag_name': 'N/A'}
        df = pd.DataFrame(data, index=[0])
        # create features and process them
        df = feature_creation(df)  # create some text features
        x, y = feature_processing(df)  # convert the text into numbers for processing
        # train test split formatting
        X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0, random_state=42)
        return X_train, X_test, Y_train, Y_test

    # load our data into X and Y
    X, _, Y, _ = load_data(*input)

    # encode the input
    encoder = models.load_model("projects/job_tag_classifier/model/encoder_model")
    X_encoded = encoder.predict(X)

    # load the classifier
    model = models.load_model("projects/job_tag_classifier/model/classifier_model")
    list_of_indices = model.predict(X_encoded)

    # decode the target back into tags
    predicition = tag_decoder(list_of_indices, threshold=.2)

    return predicition