require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const xml2json = require("xml2js").parseString;

const apiKey = process.env.CAMP_API_KEY;



router.post("/", (req, res) => {
  // Initial URL for Active API
  let URL = `http://api.amp.active.com/camping/campground/details?`;
  // Add api_key to the end of the query string
  let URL_api_key = `api_key=${apiKey}`;
});
