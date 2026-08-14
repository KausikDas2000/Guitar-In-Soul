import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  const { data, error } = await resend.emails.send({
    from: "Guitar In Soul <onboarding@resend.dev>",
    to: [to],
    subject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  console.log("Email sent:", data?.id);
};

export default sendEmail;