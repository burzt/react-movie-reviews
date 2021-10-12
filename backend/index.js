// filesystem and path for json reading
const fs = require("fs");
const path = require("path");

// We import express for use
const express = require("express");

// Alows Cross Origin Resource Sharing
const cors = require("cors");
const { json } = require("express");

// We initialize the express app
const app = express();

// Looking for a port
const port = process.env.PORT || 4000;

// Send data to the frontend
// app.get("/", (req, res) => {
//   res.send({ exampleMessage: "React client connected to Express server!" });
// });

// Initialize web app on selected port
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

const data = [];

// Fetches data from all json files in reviews/ and pushes it to data array
const jsonsInDir = fs
  .readdirSync("./reviews")
  .filter((file) => path.extname(file) === ".json");

jsonsInDir.forEach((file) => {
  const fileData = fs.readFileSync(`./reviews/${file}`, "utf8");
  const jsonData = JSON.parse(fileData.toString());

  // sanitizing the data
  if (
    jsonData.name &&
    jsonData.title &&
    typeof jsonData.rating === "number" &&
    jsonData.rating >= 0 &&
    jsonData.rating <= 10 &&
    jsonData.comment &&
    Object.keys(jsonData).length === 4
  ) {
    jsonData.rating = Math.round(jsonData.rating * 10) / 10;
    data.push(jsonData);
  } else {
    console.log("json file does not contain proper fields: " + file);
  }
});

// send data array to client
app.get("/", (req, res) => {
  res.send(data);
});
