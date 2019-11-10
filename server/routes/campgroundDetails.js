require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const xml2json = require("xml2js").parseString;

const apiKey = process.env.CAMP_API_KEY;