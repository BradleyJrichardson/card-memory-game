const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
require("dotenv").config();
const mongoURI = process.env.MONGO_PROD;
const entryModel = require("./model/entryModel");
app.use(express.json());
var cors = require("cors");
app.use(cors());
app.use("/", express.static("../frontend"));

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"));

// GET request to get game records
app.get("/game", (req, res) => {
  entryModel
    .find({})
    .then(allRecords => {
      console.log(allRecords);
      return res.json(allRecords);
    })
    .catch(err => err.json(err));
});

// POST request to create a new game record
app.post("/results", (req, res) => {
  // const { id, turns, time } = result;
  const { name, id, turns, time } = req.body;

  entryModel
    .create({ id, name, turns, time }) // talks to DB through mongoose
    .then(newGame => {
      res.json(newGame);
    })
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
