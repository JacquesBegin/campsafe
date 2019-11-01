const express = require("express");

const app = express();
const PORT = 7000;

app.get("/campgrounds", (req,res) => {
  res.send("Campgrounds");
});

app.get("/", (req, res) => {
  res.send("Home");
});

// Starts the server to listen on 
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});