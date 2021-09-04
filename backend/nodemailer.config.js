const nodemailer = require("nodemailer");
const config = require("./auth.config");
const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    transport.sendMail({
      from: user,
      to: email,
      subject: "Veuillez confirmer votre compte",
      html: `<h1>Email de Confirmation</h1>
          <h2>Bonjour, ${name}</h2>
          <p>Merci de vous être abonné. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Cliquez ici</a>
          </div>`,
    }).catch(err => console.log(err));
  };