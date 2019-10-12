import os
import time
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

    subject = ("SENDGRID - %s at %s: %s" % (name, company, reason))
    html_note = ("""
                <p>Someone has used the contact form on your portfolio website.</p>
                <p>Sendgrid sent the following message at %s.</p>
                <p>_________________________________________________</p>
                <p>Name: %s</p>
                <p>Company: %s</p>
                <p>Email: <a href="mailto:%s">%s</a></p>
                <p>Subject: %s</p>
                <p>Message: %s</p>
                """
                 % (time.ctime(), name, company, email, email, reason, message))

    message = Mail(from_email='app138263545@heroku.com',
                   to_emails='mrciolino@alum.lehigh.edu',
                   subject=subject,
                   html_content=html_note)
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
