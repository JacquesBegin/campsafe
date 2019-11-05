require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Required Route Files
const campgrounds = require("./routes/campgroundSearch");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static("public"));
app.use("/campgrounds", campgrounds);


// Default route to serve home page
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/../" });
});


// Starts the server to listen on 
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});