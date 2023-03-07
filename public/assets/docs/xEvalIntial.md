
# xEval - Intial Exploration and Architecture Design

## Market Research

To find out how people currently track legislation, we conducted a *survey* of 20 of our friends. We found that people used a variety of methods to track legislation. The most common methods were using news sources like Twitter, Facebook and Cable News. So our goal became to provide users with up to date information about legislation before those. So we looked at the sources of the legislation, the federal or state websites which many states publish (i.e. [New Jersey](https://www.njleg.state.nj.us/disclaimer), [Federal](https://www.congress.gov)). However, we found that these websites were not user friendly and we would need to build a web scraper to get the data from each individual state. 

We found [Legiscan](https://legiscan.com/), which stores all of this information from different states and provides a request limited API for anyone to use. When we followed up with the people (*Testers*) above about using legiscan they said that text search was complicated and they found it difficult to use. They told us they want to track **Topics**, the ideas they care about the most without having to worry about a text search with includes and excludes. With that in mind, we decided to build xEval, a platform that uses the data from Legiscan to provide users with a more user-friendly way to track the legislation they care about. 

## Existing Solutions

In our research, we found that there were a few other platforms that did similar things. [BillTrack50](https://www.billtrack50.com/) and [PolicyEngage](https://policyengage.com/) were two competitors. However, both of these platforms were not free and required a subscription to access customizable alerts. We wanted to provide a free service that would allow users to track legislation without having to pay for it. Our goal was to target the freimium model, where users can use the service for free but have the option to pay for more features.

## Minimum Viable Product (MVP)

With this in mind we decided to simulate what xEval would do for potential users. We spoke to our *testers* and asked them what **Topics** they wanted to track. We found that they wanted to track topics like *Healthcare*, *Employment Laws*, *Gambling*, and *Covid*. One user even wanted to use the alerts for work and track any legilsation around Gas Generators for emergency power.

Everday we would search on [Legiscan](https://legiscan.com/) for legislation that was related to the topics our testers wanted to track. We would go through the Legiscan keyword search and edit and modify the search until we found all of the legislation that was related to the topic. We would then send the results to our testers and ask them about the quality of the results. We would then modify the search the next day and send the bills we found again until we found the keywords that gave the best results.

## Website

This method turned those **Topics** into high quality **Alerts**. An **Alert** is a combination of keywords that are used to search for legislation. This meant that after refining our keyword search with legiscan that we could offer these premade alerts to users allowing them to track legislation without having to worry about the search. Since this search was done using keywords, we could also offer users the ability to create their own alerts using custom keywords.

This sucess with the alerts allowed us to move forward with the MVP. We decided to build a web app that would allow users to create an account and create their own alerts. We would then send them an email everyday with the legislation that matched their alerts. We would also allow users to create their own alerts using custom keywords.

## Frontend

The User Interface was built using Bootstrap, HTML, JS and CSS. We used Bootstrap to create a responsive design that would work on all devices. We used HTML and JS to create the forms and buttons that would allow users to create their own alerts. We also used HTML to create the email template that would be sent to users everyday with the legislation that matched their alerts. A summary of the apperance is shown in the about [README](../README.md).

## Backend

Our backend consisted of three main componets. First, a MySQL Database containg various tables for our Users, Bills, and Alerts. Second, a daily download of all leglisaltion with changes from Legiscan. Third, a script that would check all of our users alerts and send them an email if any of the bills matched their alerts. This backend automated the above process and allowed us to send our users daily emails with the legislation that matched their alerts. This process allows us to provide our users with a daily email with the legislation that matches their alerts but we wanted to go to step further.

## Data Science

We use some probabilty and statistics to provide users with two features that enhance the bills which they recieved. 

### Recommendation System

A weekly recap was created to show user a history of their alerts in addition to showing them other bills they might be interested in. This required the creation of a recommendation system. We envisioned using both collaborative and content-based filtering in a hybrid system. This meant we needed a way to compare similiarty of both our users and the bills. For the bills, we used [FastText](https://fasttext.cc/) to create text embeddings and used [FAISS](https://faiss.ai/) to sort by cosine similarity. For the users, we create a one-hot vector of the bills they had viewed and used [FAISS](https://faiss.ai/) to sort by cosine similarity to find the bills that similar users had viewed. We took the top 5 bills from both those lists and combined them to create a list of 10 bills that we would recommend to the user.

To aid 

## Stories of Usage

gas generator for hawaii

## Traction (Widget)

Cannabis Website Widget

## Usage

How much usage did we get 

## Future

Put on hold

