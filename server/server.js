const express = require("express");

const app = express();
const PORT = 7000;

app.get("/hello", (req,res) => {
  res.send("Hello World");
});

// Starts the server to listen on 
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});