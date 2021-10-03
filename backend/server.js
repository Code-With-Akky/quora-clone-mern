const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
// const busboy = require("connect-busboy");
// const busboyBodyParser = require("busboy-body-parser");
// const config = require("./config");
const db = require("./db");
const config = require("./config");
const { PORT } = config;

//db connection
db.connect();

//middleware

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to CodeWithAkkyLabs");
  }
});

app.use(cors());

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
