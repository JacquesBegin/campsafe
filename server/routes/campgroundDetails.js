require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const xml2json = require("xml2js").parseString;

const apiKey = process.env.CAMP_API_KEY;



router.post("/", (req, res) => {

  let bodyParams = req.body;

  // Constructs the URL for retrieving campground details
  let URL = `http://api.amp.active.com/camping/campground/details?contractCode=${bodyParams.contractID}&parkId=${bodyParams.facilityID}&api_key=${apiKey}`;
  console.log(URL);

  fetch(URL, { method: "POST", redirect: "follow" })
  .then(data => {
    console.log("data", data);
    return data.text();
  })
  .then(data => {
    // Convert from xml to json
    let tempResult;
    xml2json(data, (err, result) => {
      tempResult = result;
    })
    return tempResult;
  })
  .then(data => {
    let jsonData = JSON.stringify(data);
    // Create a file with response data
    // if (bodyParams.pstate) {
      fs.writeFile(`${__dirname}/../../dataFiles/${bodyParams.contractID}_${bodyParams.facilityID}.json`, jsonData, (err) => {
        if (err) throw err;
        console.log(`Saved file: ${bodyParams.contractID}_${bodyParams.facilityID}`);
      })
    // }
    return jsonData;
  })
  .then(data => {
    let dataObject = JSON.parse(data);
    console.log(typeof dataObject);
    console.log(dataObject);
    // console.log(typeof dataObject.resultset.result);
    // console.log(dataObject.resultset.result);
    let dataArray = [];
    // for (let element of dataObject.resultset.result) {
    //   let siteObj = {
    //     contractID: element["$"]["contractID"],
    //     facilityID: element["$"]["facilityID"],
    //     facilityName: element["$"]["facilityName"],
    //     latitude: element["$"]["latitude"],
    //     longitude: element["$"]["longitude"],
    //     state: element["$"]["state"]
    //   }
    //   dataArray.push(siteObj);
    // }
    return dataArray;
  })
  .then(data => res.json({ data }))
  .catch(err => console.error(err));
});


module.exports = router;

