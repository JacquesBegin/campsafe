require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use("/static", express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});



app.get("/campgrounds/", (req,res) => {
  res.send("Campgrounds");
});

app.get("/campgrounds/:state", (req,res) => {
  res.send("Campgrounds");
});



// app.post("/", (req, res) => {
//   res.send("Received POST HTTP method");
// });

// app.put("/", (req, res) => {
//   res.send("Received PUT HTTP method");
// });

// app.delete("/", (req, res) => {
//   res.send("Received DELETE HTTP method");
// });

// Starts the server to listen on 
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});