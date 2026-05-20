const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const message = req.body.message;

  res.json({
    reply: "🤖 I received: " + message + " (AI temporarily offline but system working)",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});