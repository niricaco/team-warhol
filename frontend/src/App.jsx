/* Thanks for your interest in the Harvard Art Museums API. Here is your key.

a935e3b6-39b3-439a-baab-64f82bef02df

Documentation is at https://github.com/harvardartmuseums/api-docs. */

import "./App.css";
const axios = require("axios");

async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function App() {
  return (
    <div>
      <p>szoveg</p>
    </div>
  );
}

export default App;
