import matplotlib.pyplot as plt
from joblib import load
import pandas as pd
import numpy as np
import sklearn

# dont display
import matplotlib
matplotlib.use('Agg')

dummy = ["Bill is meant to provide family's with subsidies for their disabled child policy via medicare",
         'Lindsey Graham', ['Democratic', 'Republican'], '3', '3', 'B', '1', 'Senate']

feature_df = pd.DataFrame(np.zeros(21)).transpose()
feature_df.columns = ['vote', 'sponsors', 'history', "sponser_parties_set()",
                      "sponser_parties_{'D', 'R'}", "sponser_parties_{'D'}",
                      "sponser_parties_{'I', 'D', 'R'}", "sponser_parties_{'I', 'D'}",
                      "sponser_parties_{'I', 'R'}", "sponser_parties_{'I'}",
                      "sponser_parties_{'R'}", 'bill_type_B', 'bill_type_CR', 'bill_type_JR',
                      'bill_type_R', 'body_H', 'body_S', 'status_1', 'status_2', 'status_3',
                      'status_4']

topic_cols = ['topic_0', 'topic_1', 'topic_2', 'topic_3', 'topic_4',
              'topic_5', 'topic_6', 'topic_7', 'topic_8', 'topic_9', 'topic_10',
              'topic_11', 'topic_12', 'topic_13', 'topic_14', 'topic_15', 'topic_16',
              'topic_17', 'topic_18', 'topic_19', 'topic_20', 'topic_21', 'topic_22',
              'topic_23', 'topic_24']

id_politician_map = {'Kamala Harris': 18412,
                     'Bernie Sanders': 9434,
                     'Elizabeth Warren': 15350,
                     'John Thune': 9492,
                     'Mike Rounds': 16521,
                     'Lindsey Graham': 9488}


vectorizer = load("projects/politican_classifier/models/vectorizer.joblib")
lda_model = load("projects/politican_classifier/models/lda_model.joblib")


def construct_dataframe(features):

    # get copy
    df = feature_df.copy(deep=True)

    # Topic dist
    vectorized = vectorizer.transform([features[0]])
    topic_dist = np.matrix(lda_model.transform(vectorized[0])).tolist()[0]

    # categorical features
    body = "body_S" if features[7] == "Senate" else "body_H"
    status = "status_" + str(features[6])
    type = "bill_type_" + str(features[5])
    sponser_parties = "sponser_parties_" + str(set([party[0:1] for party in features[2]]))

    # numerical features
    history = float(features[4]) / 10  # min max scaler
    sponsors = float(features[3]) / 25  # min max scaler

    # place all the valeus in the df
    for col in [body, status, type, sponser_parties]:
        df[col] = 1

    df.history, df.sponsors = history, sponsors

    topic_df = pd.DataFrame(topic_dist).transpose()
    topic_df.columns = topic_cols
    df = df.join(topic_df)

    return df


def f_importances(imp, names, top):
    # create chart
    imp, names = zip(*sorted(list(zip(imp, names))))
    fig = plt.figure(figsize=(12, 8))
    plt.barh(range(top), imp[::-1][0:top], align='center')
    plt.yticks(range(top), names[::-1][0:top])

    # save to numpy array
    fig.canvas.draw()
    data = np.frombuffer(fig.canvas.tostring_rgb(), dtype=np.uint8)
    data = data.reshape(fig.canvas.get_width_height()[::-1] + (3,))

    return data


def predict_vote(features):

    # get dataframe
    df = construct_dataframe(features)

    # grab model
    model = load("projects/politican_classifier/models/" + str(id_politician_map[features[1]]) + "_svc.joblib")

    # grab feature importance
    data = f_importances(abs(model.coef_[0]), df.columns.tolist(), top=30).tolist()

    # predict vote
    vote = model.predict(df.drop(columns=['vote']).values)

    # decode vote
    vote = 'vote_yes' if int(vote) == 1 else 'vote_no'

    return [vote, data]

    
