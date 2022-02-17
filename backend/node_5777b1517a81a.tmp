const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const users = require('./data/users.json')

app.get("/signup", (req, res) => {
  res.send("Hello World!");
});

app.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.status(400).json("Missing credentials")
  }
  const userExists = users.some((user) => user.name === req.body.name)
  if (userExists) {
    return res.sendStatus(409)
  }
  const newUser = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }
  users.push(newUser)

  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 4))
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
