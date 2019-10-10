import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

"""
Feature_1: document.getElementById('form_name').value, //name
Feature_2: document.getElementById('form_lastname').value, //company
Feature_3: document.getElementById('form_email').value, //email
Feature_4: document.getElementById('form_need').value, //reason
Feature_5: document.getElementById('form_message').value, //message
"""


def send_simple_message(name, company, email, reason, message):
    subject = "Name: " + str(name) + "\nCompany: " + str(company)
    content = str(subject) + "\nEmail: " + str(email) + "\nSubject: " + str(reason) + "\nMessage: " + str(message)
    message = Mail(from_email='app138263545@heroku.com',
                   to_emails='mrciolino@alum.lehigh.edu',
                   subject=subject,
                   plain_text_content=content)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        code = 200
    except Exception as e:
        code = str(e)

    return code

if __name__ == "__main__":
    name, company, email, reason, message = ["Matt", "Self-Employed", "self@email.com", "Testing", "How is it going?"]
    send_simple_message(name, company, email, reason, message)
