import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  console.log("EMAIL:", process.env.EMAIL);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
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