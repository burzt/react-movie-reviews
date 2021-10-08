// filesystem and path for json reading
const fs = require("fs");
const path = require("path");

// We import express for use
const express = require("express");

// Alows Cross Origin Resource Sharing
const cors = require("cors");

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
  data.push(jsonData);
});

// send data array to client
app.get("/", (req, res) => {
  res.send(data);
});
