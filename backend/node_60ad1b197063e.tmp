const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const users = require('./data/users.json')

/*app.get("/api/signup", (req, res) => {
  res.send("Hello World!");
});*/

app.post('/api/login', (req, res) => {
  const authHeader=req.header("authorization");
  if (!authHeader) return res.sendStatus(401);
  const userEmail = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];

  const user = users.find(user => user.email === userEmail && user.password === password);
  
  if (!user) {
    return res.sendStatus(401)
  }
  const sessionId = Math.random().toString;
  mySessionStorage [sessionId] = user;
  console.log(mySessionStorage);
  setTimeout(() => {
    delete mySessionStorage[sessionId];
  }, 10*60*1000);
  
  res.json(sessionId);

  res.sendStatus(200);return res.sendStatus(200);
  
})





app.post('/api/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Missing credentials")
  }
  const userExists = users.some(user => user.email === req.body.email)
  if (userExists) {
    return res.status(409).json("User already exist")
  }
  const newUser = {
  //  name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }
  users.push(newUser)

  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 4))
  res.status(200).json("User registered")
})

/*app.delete("/api/logout", (req, res) => {

  const sessionId=req.header('authorization');
  if(!sessionId) return res.sendStatus(401)
  delete mySessionStorage[sessionId];
  res.sendStatus(200);
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })*/

app.listen(port, () => {
  console.log(`Registration listening on port ${port}`);
});
