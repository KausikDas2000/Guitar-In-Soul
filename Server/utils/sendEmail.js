import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  console.log("EMAIL:", process.env.EMAIL);
  console.log("PASSWORD:", process.env.EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.verify();

  console.log("SMTP Connected");

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
};

export default sendEmail;