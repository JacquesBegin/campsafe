require("dotenv").config();
const express = require("express");
const router = express.Router();
const xml2json = require("xml2js")

const apiKey = process.env.CAMP_API_KEY;

let queryParams = {
  landmarkLat = "",
  landmarkLong = "",
  siteType = "",
  pstate = "",
  pname = "",
  amenity = "",
  eqplen = "",
  Maxpeople = "",
  hookup = "",
  water = "",
  sewer = "",
  pull = "",
  pets = "",
  waterfront = ""
}


// Possibly create a log file that tracks each time a route is called 
// and what data is being searched for.

router.post("/", (req, res) => {
  // Use req.body to retrieve parameters to use in Active api URL
  console.log(`req.body1: ${JSON.stringify(req.body)}`);

  // Convert from xml to json


  // Use this to send data back
  res.json({ message: "Campground Route" });

});

router.get("/:state", (req, res) => {
res.send("Campgrounds for a state");
});


module.exports = router;