
"""
# pagesviews
https://pageviews.toolforge.org/siteviews/?platform=all-access&source=pageviews&agent=user&range=all-time&sites=en.wikipedia.org

# unique devices
https://pageviews.toolforge.org/siteviews/?platform=all-sites&source=unique-devices&range=latest-10&sites=en.wikipedia.org

scrap the wikipedia data every day to get up to date data
embed a bunch of different algos every night and allow a person to compare them over time
"""
import fbprophet
from plotly.offline import init_notebook_mode
import plotly.offline as py
import plotly.graph_objs as go
import pandas as pd
import requests
import datetime

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

init_notebook_mode(connected=True)

# device
md = fbprophet.Prophet()
md.fit(device_df)
futured = md.make_future_dataframe(periods=60)
forecastd = md.predict(futured)
pd = md.plot(forecastd)
# views
mv = fbprophet.Prophet()
mv.fit(page_df)
futurev = mv.make_future_dataframe(periods=60)
forecastv = mv.predict(futurev)
pv = mv.plot(forecastv)

df = page_df.copy(deep=True)
df2 = df.copy()
df_forecast = mv.predict(futurev)


trace = go.Scatter(
    name='Actual price',
    mode='markers',
    x=list(df_forecast['ds']),
    y=list(df['y']),
    marker=dict(
        color='#FFBAD2',
        line=dict(width=1)
    )
)
trace1 = go.Scatter(
    name='trend',
    mode='lines',
    x=list(df_forecast['ds']),
    y=list(df_forecast['yhat']),
    marker=dict(
        color='red',
        line=dict(width=3)
    )
)
upper_band = go.Scatter(
    name='upper band',
    mode='lines',
    x=list(df_forecast['ds']),
    y=list(df_forecast['yhat_upper']),
    line=dict(color='#57b88f'),
    fill='tonexty'
)
lower_band = go.Scatter(
    name='lower band',
    mode='lines',
    x=list(df_forecast['ds']),
    y=list(df_forecast['yhat_lower']),
    line=dict(color='#1705ff')
)
tracex = go.Scatter(
    name='Actual price',
    mode='markers',
    x=list(df2['ds']),
    y=list(df2['y']),
    marker=dict(
        color='black',
        line=dict(width=2)
    )
)
data = [tracex, trace1, lower_band, upper_band, trace]

layout = dict(title='Bitcoin Price Estimation Using FbProphet',
              xaxis=dict(title='Dates', ticklen=2, zeroline=True))

figure = dict(data=data, layout=layout)
py.offline.iplot(figure)

# https://www.kaggle.com/ahmetax/fbprophet-and-plotly-example
