const express = require("express");
const cors = require("cors");
const sendEmailUtility = require("./SendEmailUtility");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mail", async (req, res) => {
  const { email, text } = req.body;

  const sendEmail = await sendEmailUtility(
    email,
    text,
    "Invitation for Dhaka Seminar"
  );

  res.status(200).json({ status: "success", data: sendEmail });
});

// PORT
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
