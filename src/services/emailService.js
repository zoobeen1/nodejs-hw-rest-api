const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

exports.sendEmail = (data) => {
  const { email, token } = data;
  const options = {
    from: 'zoobeen@meta.ua',
    to: email,
    subject: 'Verefication',
    text: `Click for verification: ${process.env.HOST}:${process.env.PORT}/api/users/verify/${token}`,
  };
  transporter
    .sendMail(options)
    .then((info) => {
      console.log(info);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
