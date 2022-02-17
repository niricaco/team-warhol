const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const users = require('./data/users.json')

/*app.get("/api/signup", (req, res) => {
  res.send("Hello World!");
});*/

app.post('/api/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Missing credentials")
  }
  const userExists = users.some(user => user.email === req.body.email)
  if (userExists) {
    return res.status(409).json("User already exist with an other password")
  }
  const newUser = {
  //  name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }
  users.push(newUser)

  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 4))
  res.status(200).json("User registriert")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
