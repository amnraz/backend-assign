const express = require("express");
const transporter = require("../config/mailer");

const router = express.Router();

router.get("/sendemail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "1209amankumar@gmail.com",
      subject: "Testing Mail",
      text: "This is a testing Mail sent by NEM student, no need to reply."
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

module.exports = router;
