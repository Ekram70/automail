const express = require("express");
const cors = require("cors");
const sendEmailUtility = require("./SendEmailUtility");
const formatText = require("./FormatText");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mail", async (req, res) => {
  const { text, users } = req.body;

  users.map(async (user) => {
    await sendEmailUtility(
      user.email,
      formatText(text, user),
      "Invitation for Interview"
    );
  });

  res.status(200).json({ status: "success" });
});

app.get("/", (req, res) => res.send("hi"));

// PORT
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
