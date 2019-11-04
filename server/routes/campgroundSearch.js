const express = require("express");
const router = express.Router();

// Possibly create a log file that tracks each time a route is called 
// and what data is being searched for.

router.get("/", (req, res) => {
  res.send("Campground Route");
});

router.get("/:state", (req, res) => {
res.send("Campgrounds for a state");
});


module.exports = router;