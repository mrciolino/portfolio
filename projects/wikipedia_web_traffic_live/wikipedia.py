from time import sleep
import pandas as pd
import fbprophet
import requests
import datetime
import pickle
import json
import os

def grab_wikipedia_dataframe():
    # YYYYMMDD
    date = datetime.datetime.now()
    date_list = [str(date.year), "{0:0=2d}".format(date.month), "{0:0=2d}".format(date.day)]
    date = int("".join(date_list))
    # request
    headers = {'accept': 'application/json'}
    unique_devices_url = 'https://wikimedia.org/api/rest_v1/metrics/unique-devices/en.wikipedia.org/all-sites/daily/{start}/{end}'.format(start=20150701, end=date)
    pageviews_url = "https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/en.wikipedia.org/all-access/user/daily/{start}/{end}".format(start=20150701, end=date)
    response_devices = requests.get(unique_devices_url, headers=headers)
    response_pageviews = requests.get(pageviews_url, headers=headers)
    device_dict = eval(response_devices.text)
    pageviews_dict = eval(response_pageviews.text)
    # create dataframe page df
    page_df = pd.DataFrame()
    for row in pageviews_dict['items']:
        date = row['timestamp']
        date = datetime.datetime(year=int(date[0:4]), month=int(date[4:6]), day=int(date[6:8]))
        views = row['views']
        page_df = page_df.append([{"ds": date.strftime('%Y-%m-%d'), "y": views}])
    # create dataframe device df
    device_df = pd.DataFrame()
    for row in device_dict['items']:
        date = row['timestamp']
        date = datetime.datetime(year=int(date[0:4]), month=int(date[4:6]), day=int(date[6:8]))
        devices = row['devices']
        device_df = device_df.append([{"ds": date.strftime('%Y-%m-%d'), "y": devices}])

    return page_df, device_df


def forcast_prophet(page_df, device_df):
    # device
    md = fbprophet.Prophet()
    md.fit(device_df)
    futured = md.make_future_dataframe(periods=60)
    forecastd = md.predict(futured)

    # views
    mv = fbprophet.Prophet()
    mv.fit(page_df)
    futurev = mv.make_future_dataframe(periods=60)
    forecastv = mv.predict(futurev)

    data = {"pageviews": {"page_df": page_df,
                          "forecastv": forecastv},
            "device": {"device_df": device_df,
                       "forecastd": forecastd}}

    return data


def update_wikipedia():

    page_df, device_df = grab_wikipedia_dataframe()
    data = forcast_prophet(page_df, device_df)
    wikipedia_data = {"views_y" : data['pageviews']['page_df'].y.to_list(),
                     "views_ds" : data['pageviews']['page_df'].ds.to_list(),
                     "views_forcast_ds" :  data['pageviews']['forecastv'].ds.apply(lambda x: str(x).split(" ")[0]).to_list(),
                     "views_forcast_yhat" : data['pageviews']['forecastv'].yhat.to_list(),
                     "views_forcast_yhat_upper" : data['pageviews']['forecastv'].yhat_upper.to_list(),
                     "views_forcast_yhat_lower" : data['pageviews']['forecastv'].yhat_lower.to_list(),
                     "device_y" : data['device']['device_df'].y.to_list(),
                     "device_ds" : data['device']['device_df'].ds.to_list(),
                     "device_forcast_ds" :data['device']['forecastd'].ds.apply(lambda x: str(x).split(" ")[0]).to_list(),
                     "device_forcast_yhat" : data['device']['forecastd'].yhat.to_list(),
                     "device_forcast_yhat_upper" : data['device']['forecastd'].yhat_upper.to_list(),
                     "device_forcast_yhat_lower" : data['device']['forecastd'].yhat_lower.to_list()}
    with open("static/refs/wikipedia/wikipedia.json", "w") as write_file:
        json.dump(wikipedia_data, write_file)
