const dotenv = require('dotenv');

const nodemailer = require('nodemailer');
const logger = require('./logger');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Welcome | Your account created successfully',
    text: `You can login to the platform by the information below: \n
    Login URL: http://localhost:3000
    Email: ${user.email} \n
    Password: The password used while registration \n
    Thank you for using Bursapediary.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.info(error.message);
    }
    logger.info(info.response);
  });
};

module.exports = sendEmail;
