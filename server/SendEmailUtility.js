const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo, emailText, emailSub) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: "ekramullah69@gmail.com",
      pass: "cosunbvlukikoqpg",
    },
  });

  const mailOptions = {
    from: "ESI Global Services <ekramullah69@gmail.com>",
    to: emailTo,
    subject: emailSub,
    text: emailText,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
