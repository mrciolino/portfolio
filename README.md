![](/public/assets/images/portfolio.webp)

# Portfolio

Code for my machine learning portfolio. Contains projects that i have done over the years. You will find Websites, Githubs, Colabs, PowerPoints and Papers here. These are the specializations that I have made during my journey through data science.

<center>

[![Matthew Ciolino](https://badgen.net/badge/Open-Matthew-Ciolino/Live/green?icon=terminal)](https://www.matthewciolino.com/)

Visit the website: https://www.matthewciolino.com/

</center>

## Website Iterations
🐍 Python & Flask → 💻 HTML, CSS, & JavaScript → 💥 React & Bootstrap 

 It's been some time since the first iteration of this simple web application using Python and Flask. Back then, it was just a basic platform for showcasing my work in the field of machine learning. But as time went on, I realized that I needed to upgrade and provide a better user experience for visitors. So, I decided to rewrite myself using HTML, CSS, and JavaScript. This allowed for a cleaner and more interactive interface and was definitely a step up from my previous version. But I wasn't content with just settling for good enough, and that brings us to today, where in its latest iteration, the portfolio uses React and Bootstrap. This has allowed for a more dynamic and responsive design, and I am very happy with the results. I hope you enjoy it as well.

## Deployment Iterations
🚀 Heroku → 💥 AWS Amplify 

Initially, the deployment of this portfolio was done on Heroku, utilizing its dynos for hosting the website. However, over time, I realized that there was room for improvement in terms of reliability and scalability. After some research, I decided to move to AWS Amplify, which offered a more robust and flexible hosting solution. With AWS Amplify, I now have access to a powerful cloud infrastructure that allows for seamless scalability, automatic backups, and improved performance. In addition to the benefits of scalability and reliability, the use of Docker container repositories on AWS has allowed me to easily manage and deploy updates to my portfolio with just a few clicks. In conclusion, my deployment journey has been a learning experience, and I am very satisfied with the end result.

## Use for your own portfolio

If you want to use this portfolio for your own, you can fork it and make it your own. You can also use it as a template for your own portfolio. If you do, please give me credit. I would love to see what you do with it. The following are the important files to look at if you want to make your own portfolio:

1. src/data.json: Most of the text is stored in here and loaded in views.jsx
2. public/assets/(images/icons/docs): The images/icons/docs are stored in the here
3. src/(App/views/components): All the react code is stored here
4. src/App.scss: All the style code is stored here

To launch the app through docker, run the following commands:

```
docker-compose up
```
To host the code I used AWS Amplify. You can use any hosting service you want. If you want to use AWS Amplify, I did the following:

1. Create an AWS account
2. Create IAM user with Amplify access (or all access)
3. Install AWS CLI and configure it with IAM user
4. Build and upload dockerfile to AWS ECR (```docker build -t portfolio .```)
5. Create an AWS Amplify app
6. Connect main branch to AWS Amplify
7. Connect dockerfile to build settings
8. Modify rules to include webp|pdf|... files
9. Deploy and Enjoy 💥

## Overview

### Hero Section

![](/public/assets/images/readme-hero.webp)

### About Section

![](/public/assets/images/readme-about.webp)

### Research and Resume Section

![](/public/assets/images/readme-resume.webp)

### Projects Section

![](/public/assets/images/readme-projects.webp)

### Dark Mode

![](/public/assets/images/readme-hero-dark.webp)
