const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");

const winston = require("winston");
const expressWinston = require("express-winston");

app.use(cors());
app.use(express.json());

/*const logLevel = "info";
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console({ level: logLevel })],
  })
);*/

//const users = require("./users.json");
let mySessionStorage = {};

app.post("/api/login", (req, res) => {
  const users = require("./users.json");
  const authHeader = req.header("authorization");
  if (!authHeader) return res.sendStatus(401);
  const userEmail = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];
  const user = users.find(
    (user) => user.email === userEmail && user.password === password
  );
  if (!user) {
    return res.sendStatus(401);
  }
  const sessionId = Math.random().toString();
  mySessionStorage[sessionId] = user;
  return res.json(sessionId);
});

app.post("/api/signup", (req, res) => {
  const users = require("./users.json");
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Missing credentials");
  }
  const userExists = users.some((user) => user.email === req.body.email);
  if (userExists) {
    return res.status(409).json("User already exist");
  }
  const newUser = {
    password: req.body.password,
    email: req.body.email,
    photos: [],
  };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.status(200).json("User registered");
});

app.delete("/api/logout", (req, res) => {
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  delete mySessionStorage[sessionId];
  res.sendStatus(200);
});

app.post("/api/save", (req, res) => {
  const users = require("./users.json");
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  const user = mySessionStorage[sessionId];
  if (!user) return res.sendStatus(401);
  if (!req.body.url) return res.sendStatus(400);
  const picture = req.body;
  user.photos.push(picture);
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);
});

app.get("/api/getCollection", (req, res) => {
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  const pictures = mySessionStorage[sessionId].photos;
  if (!pictures) return res.sendStatus(400);
  res.json(pictures);
});

app.post("/api/modifyCollection", (req, res) => {
  const users = require("./users.json");
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  const pictures = mySessionStorage[sessionId].photos;
  if (!pictures) return res.sendStatus(400);
  let foundUser = users.find(
    (u) => u.email === mySessionStorage[sessionId].email
  );
  const foundPic = foundUser.photos.filter((p) => p.index !== req.body.i);
  foundUser.photos = foundPic;
  mySessionStorage[sessionId].photos = foundPic;
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 4));
  res.status(200).json("Item removed");
});

app.listen(port, () => {
  console.log(`Registration listening on port ${port}`);
});
