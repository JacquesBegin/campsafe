require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const xml2json = require("xml2js")

const apiKey = process.env.CAMP_API_KEY;

let queryParams = {
  landmarkLat: "",
  landmarkLong: "",
  siteType: "",
  pstate: "",
  pname: "",
  amenity: "",
  eqplen: "",
  Maxpeople: "",
  hookup: "",
  water: "",
  sewer: "",
  pull: "",
  pets: "",
  waterfront: ""
}


// TODO Possibly create a log file that tracks each time a route is called 
// and what data is being searched for.

router.post("/", (req, res) => {
  // Use req.body to retrieve parameters to use in Active api URL
  console.log(`req.body1: ${JSON.stringify(req.body)}`);

  let URL = `http://api.amp.active.com/camping/campgrounds?`;
  let URL_api_key = `&api_key=${apiKey}`;

  // Build query string from the req.body params
  for ()

  // Make call to Active API to retrieve campgrounds for a State
  fetch("")

  // Convert from xml to json


  // Use this to send data back
  res.json({ message: "Campground Route" });

});

router.get("/:state", (req, res) => {
res.send("Campgrounds for a state");
});


module.exports = router;