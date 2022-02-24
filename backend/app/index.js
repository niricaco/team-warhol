const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");

const winston = require("winston");
const expressWinston = require("express-winston");

app.use(cors());
app.use(express.json());

/* const logLevel = "info";
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console({ level: logLevel })],
  })
); */

const users = require("./data/users.json");

let mySessionStorage = {};

/*app.get("/api/signup", (req, res) => {
  res.send("Hello World!");
});*/

/**** LOG IN ****/
app.post("/api/login", (req, res) => {
  // const rawdata = fs.readFileSync("./data/users.json");
  // const users = JSON.parse(rawdata);

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
  /*setTimeout(() => {
    delete mySessionStorage[sessionId];
  }, 10 * 60 * 1000);*/

  return res.json(sessionId);

  /* return res.sendStatus(200); */
});

/**** SIGN UP ****/
app.post("/api/signup", (req, res) => {
  // const rawdata = fs.readFileSync("./data/users.json");
  // const users = JSON.parse(rawdata);

  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Missing credentials");
  }
  const userExists = users.some((user) => user.email === req.body.email);
  if (userExists) {
    return res.status(409).json("User already exist");
  }
  const newUser = {
    //  name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    photos: [],
  };
  users.push(newUser);

  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4));
  res.status(200).json("User registered");
});

app.delete("/api/logout", (req, res) => {
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  delete mySessionStorage[sessionId];
  res.sendStatus(200);
});

app.post("/api/save", (req, res) => {
  /*   const rawdata = fs.readFileSync("./data/users.json");
  const users = JSON.parse(rawdata);
  console.log(users); */
  //console.log(req.body);
  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  const user = mySessionStorage[sessionId];
  //console.log("87es sor user =", user);
  if (!user) return res.sendStatus(401);
  if (!req.body.url) return res.sendStatus(400);
  /*title, index, image, creator, date, desc, funfact*/
  const picture = req.body;
  user.photos.push(picture);
  //console.log(user.photos);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4));
  res.sendStatus(200);
});

app.get("/api/getCollection", (req, res) => {
  /*   const rawdata = fs.readFileSync("./data/users.json");
  const users = JSON.parse(rawdata);
  console.log(users); */

  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  //console.log(sessionId);
  const pictures = mySessionStorage[sessionId].photos;
  //console.log("87es sor user =", user);
  if (!pictures) return res.sendStatus(400);
  //const user = mySessionStorage[sessionId];
  //console.log(pictures);

  //if (!req.body.url) return res.sendStatus(400);
  //const picture = req.body.url;

  res.json(pictures);
});

app.delete("/api/modifyCollection", (req, res) => {
  const rawdata = fs.readFileSync("./data/users.json");
  const users = JSON.parse(rawdata);
  console.log(users); 

  const sessionId = req.header("authorization");
  if (!sessionId) return res.sendStatus(401);
  const pictures = mySessionStorage[sessionId].photos;
  if (!pictures) return res.sendStatus(400);

  /*
    app.delete("/api/logout", (req, res) => {
    const sessionId = req.header("authorization");
    if (!sessionId) return res.sendStatus(401);
    delete mySessionStorage[sessionId];
    res.sendStatus(200);
    });
  */

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Registration listening on port ${port}`);
});
