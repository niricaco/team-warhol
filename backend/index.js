const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/signup", (req, res) => {
  res.send("Hello World!");
});

app.post('/api/signup', (req, res) => {
  //...
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
