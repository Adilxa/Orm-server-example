import MailService from "../Services/MailService.js";

export const SendEmail = async (req, res) => {
  try {
    const { to, link, subject, message, imageUrl } = req.body;

    await MailService.sendActivationMail(to, link, subject, message, imageUrl);

    return res.json({
      status: 200,
      message: "Activation email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to send activation email",
    });
  }
};
