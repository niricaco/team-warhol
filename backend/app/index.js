const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

//const users = require("./users.json");
let mySessionStorage = {};

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

app.delete("/api/logout", (req, res) => {
  const sessionId = req.header("authorization");
  console.log(req.header);
  if (!sessionId) return res.sendStatus(401);
  console.log(mySessionStorage);
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

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

/* app.post("/api/signup", (req, res) => {
    if (!req.body.email || !req.body.password)
    return res.status(400).json("Missing credentials");
    fs.readFile("users.json", "", (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      const users = JSON.parse(data);
      const userExists = users.some((user) => user.email === req.body.email);
      if (userExists) return res.status(409).json("User already exist");
      const newUser = {
        email: req.body.email,
        password: req.body.password,
        photos: [],
      };
      users.push(newUser);
      fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(400);
        }
        console.log("//file written successfully");
        //file written successfully
      });
      res.status(200).json("User registered");
    });
  }); */

/* app.post("/api/login", (req, res) => {
    const authHeader = req.header("authorization");
    if (!authHeader) return res.sendStatus(401);
    const userEmail = authHeader.split(":::")[0];
    const password = authHeader.split(":::")[1];
    fs.readFile("users.json", "", (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      const users = JSON.parse(data);
      const user = users.find(
        (user) => user.email === userEmail && user.password === password
        );
        if (!user) return res.sendStatus(401);
      const sessionId = Math.random().toString();
      mySessionStorage[sessionId] = user;
      console.log(mySessionStorage);
      setTimeout(() => {
        delete mySessionStorage[sessionId];
      }, 60 * 60 * 1000);
      return res.json(sessionId);
    });
  }); */

/* app.post("/api/write", (req, res) => {
      if (!req.body.save) return res.send("Wrong query data");
      fs.readFile("data.json", "", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        niceData = JSON.parse(data);
        const toSave = req.body.save;
        const dataToSave = {
          id: niceData.length + 1,
          data: toSave,
          photos: [],
        };
        niceData.push(dataToSave);
        fs.writeFile("data.json", JSON.stringify(niceData), (err) => {
          if (err) {
            console.error(err);
            return res.sendStatus(400);
          }
          //file written successfully
        });
      });
      return res.sendStatus(204);
    });
    
    app.get("/api/get", (req, res) => {
      fs.readFile("data.json", "", (err, data) => {
        if (err) {
          console.error(err);
          return res.sendStatus(400);
        }
        console.log(data);
        return res.send(data);
      });
    }); */
