const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Ooops... this URL does not exist");
});

app.listen(PORT, () => {
  console.log(`Ethereum ToDo List App running on port ${PORT}`);
});