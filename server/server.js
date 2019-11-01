require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

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