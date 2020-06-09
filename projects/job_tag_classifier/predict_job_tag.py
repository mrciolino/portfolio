import pandas as pd
import zipfile
import gensim
import pickle
import sys

sys.path.append("projects/job_tag_classifier/Job Tag Classifier Tools")
from Pipeline import tag_decoder
from DataCollection import remove_unwanted_rows
from FeatureCreation import aggregate_job_tag_rows
from FeatureProcessing import clean_text, strip_text, stem_text, target_encoder

classifer_file = "projects/job_tag_classifier/model/new_model/classifier"
doc2vec_file = "projects/job_tag_classifier/model/new_model/doc2vec"
targets_file = "projects/job_tag_classifier/model/new_model/target_tokens.pkl"
vocab_file = "projects/job_tag_classifier/model/new_model/vocab"

# unzip models
with zipfile.ZipFile(classifer_file+".zip", 'r') as zip_ref:
    zip_ref.extractall("/".join(classifer_file.split("/")[:-1]))
with zipfile.ZipFile(doc2vec_file+".zip", 'r') as zip_ref:
    zip_ref.extractall("/".join(doc2vec_file.split("/")[:-1]))

# load models
model = gensim.models.doc2vec.Doc2Vec.load(doc2vec_file)
with (open(vocab_file, "rb")) as f:
    vocab = pickle.load(f)
with open(targets_file, 'rb') as handle:
    tokenizer = pickle.load(handle)
with (open(classifer_file, "rb")) as classifier:
    clf = pickle.load(classifier)


def preprocess_strings(data):
        # preprocessing step to reduce words to semi-root form
        CUSTOM_FILTERS = [lambda x: x.lower(),
                          gensim.parsing.preprocessing.strip_tags,
                          gensim.parsing.preprocessing.strip_punctuation,
                          gensim.parsing.preprocessing.strip_numeric,
                          gensim.parsing.preprocessing.remove_stopwords,
                          gensim.parsing.preprocessing.strip_short,
                          gensim.parsing.preprocessing.strip_multiple_whitespaces]
        texts = [gensim.parsing.preprocessing.preprocess_string(doc, CUSTOM_FILTERS) for doc in data]
        return texts


def run_predictions(input):

    # get list of list of words
    title, description = input
    df = pd.DataFrame(columns=["job_description","job_title"], data = [[description, title]])
    df = clean_text(df)
    df = strip_text(df)
    text = preprocess_strings(df.job_description.values)

    # predict
    event = [word for word in text[0] if word in vocab]
    list_of_indices = clf.predict([model.infer_vector(event)])
    target = []
    for i, num in enumerate(list_of_indices[0]):
        if num > .25:
            target.append(str(tokenizer.classes_[i]))
    return target


    """
    from Pipeline import tag_decoder
    from FeatureCreation import feature_creation
    from FeatureProcessing import feature_processing
    """

    """
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
        return df
    """

    """
    # encode the input
    encoder = models.load_model("projects/job_tag_classifier/model/encoder_model")
    X_encoded = encoder.predict(X)

    # load the classifier
    model = models.load_model("projects/job_tag_classifier/model/classifier_model")
    list_of_indices = model.predict(X_encoded)

    # decode the target back into tags
    predicition = tag_decoder(list_of_indices, threshold=.2)
    """

    """
    # create features and process them
    df = feature_creation(df)  # create some text features
    x, _ = feature_processing(df)  # convert the text into numbers for processing
    """
