const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//   to: "lsiddique415@gmail.com",
//   from: "linkon.spekter@gmail.com",
//   subject: "This is my first creation!",
//   text: "I hope this one actually get to you.",
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "linkon.spekter@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "linkon.spekter@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
