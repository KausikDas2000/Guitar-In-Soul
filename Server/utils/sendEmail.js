import nodemailer from "nodemailer";
import dns from "dns";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },

    dns: {
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
      },
    },
  });

  await transporter.verify();

  console.log("SMTP Connected");

  await transporter.sendMail({
    from: `"Guitar In Soul" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;