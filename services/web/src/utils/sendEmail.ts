import emailjs from 'emailjs-com';

const sendEmail = emailPayload => {
  emailjs
    .send(process.env.REACT_APP_EMAIL_SERVICE_ID, 'contact_form', emailPayload)
    .then(
      result => {
        console.log('success', result.status, result.text);
      },
      error => {
        console.error(error.text);
      }
    );
};

export default sendEmail;
