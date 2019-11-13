require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");

const apiKey = process.env.NPS_API_KEY;

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
  let bodyParams = req.body;

  // Initial URL for NPS API
  let URL = `https://developer.nps.gov/api/v1/campgrounds?`;
  // Add api_key to the end of the query string
  let URL_api_key = `api_key=${apiKey}`;

  // Build query string from the req.body params
  for (let key in bodyParams) {
    if (bodyParams[key]) {
      URL += `${key}=${bodyParams[key].toLowerCase()}&`
    }
  }

  // Make call to Active API to retrieve campgrounds for a State
  fetch(`${URL}${URL_api_key}`)
  .then(data => data.json())
  .then(data => console.log(data))
  .then(data => {
    let jsonData = JSON.stringify(data);
    // Create a file with response data
    if (bodyParams.stateCode) {
      fs.writeFile(`${__dirname}/../../dataFiles/${bodyParams.stateCode}.json`, jsonData, (err) => {
        if (err) throw err;
        console.log(`Saved pstate: ${bodyParams.stateCode}`);
      })
    }
    return jsonData;
  })
  // .then(data => {
  //   let dataObject = JSON.parse(data);
  //   // console.log(typeof dataObject);
  //   // console.log(dataObject);
  //   // console.log(typeof dataObject.resultset.result);
  //   // console.log(dataObject.resultset.result);
  //   let dataArray = [];
  //   for (let element of dataObject.resultset.result) {
  //     let siteObj = {
  //       contractID: element["$"]["contractID"],
  //       facilityID: element["$"]["facilityID"],
  //       facilityName: element["$"]["facilityName"],
  //       latitude: element["$"]["latitude"],
  //       longitude: element["$"]["longitude"],
  //       state: element["$"]["state"]
  //     }
  //     dataArray.push(siteObj);
  //   }
  //   return dataArray;
  // })
  // .then(data => res.json({ data }))
  .catch(err => console.error(err));
});


router.get("/:state", (req, res) => {
res.send("Campgrounds for a state");
});




module.exports = router;