const express = require("express");
const router = express.Router();


// Possibly create a log file that tracks each time a route is called 
// and what data is being searched for.

router.post("/", (req, res) => {
  console.log(`req.body1: ${JSON.stringify(req.body)}`);
  console.log(`req.body2: ${req.body}`);
  res.send({ message: "Campground Route" });

});

router.get("/:state", (req, res) => {
res.send("Campgrounds for a state");
});


module.exports = router;