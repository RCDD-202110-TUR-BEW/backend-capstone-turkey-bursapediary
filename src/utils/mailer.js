const dotenv = require('dotenv');

const nodemailer = require('nodemailer');
const logger = require('./logger');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome | Your account created successfully',
    text: `You can login to the platform by the information below: \n
    Login URL: https://bursapediary.com
    Email: ${user.email}
    Username: ${user.username}
    Password: The password used while registration \n
    Thank you for using Bursapediary.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return logger.info(error.message);
    }
    return logger.info(info.response);
  });
};

module.exports = sendEmail;
