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
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);
  const userEmail = authHeader.split(":::")[0];
  const password = authHeader.split(":::")[1];
  console.log(userEmail, password);

  const user = users.find(user => user.email === userEmail && user.password === password);
  console.log(user);

  if (!user) {
    return res.sendStatus(401)
  }
  
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

app.listen(port, () => {
  console.log(`Registration listening on port ${port}`);
});
