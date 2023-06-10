const express = require("express");
const cors = require("cors");
// const sendEmailUtility = require("./SendEmailUtility");
const formatText = require("./FormatText");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mail", async (req, res) => {
  const { text, users } = req.body;

  const emailText = formatText(text);
  console.log(emailText);

  /* users.map(async (user) => {
    await sendEmailUtility(
      `${emailText}`,
      text,
      "Invitation for Dhaka Seminar"
    );
  }); */

  res.status(200).json({ status: "success" });
});

// PORT
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
