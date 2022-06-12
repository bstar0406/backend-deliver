const functions = require("firebase-functions");
const postgrid = require("./postgrid");
const packing = require("./3dbinpacking");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;
const server = express();

server
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cors())

  .post("*/address-verification", (req, res) => {
    postgrid.batchAddressVerification(req, res);
  })
  .post("*/packing-verification", (req, res) => {
    packing.binsAndItemsPackingVerification(req, res);
  })
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

exports.app = functions.https.onRequest(server);
