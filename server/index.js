const express = require("express");
const app = express();
const mongoose = require("mongoose");

const RestaurantsModel = require("./models/Restaurants");
const userModel = require("./models/User");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://dbAdmin:UfjFjCmaGJA@cluster0.pktdq.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);

app.get("/restaurants", (req, res) => {
  RestaurantsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
      // res.send({"message":"OK"})
    }
  });
});

app.get("/restaurants/:page", (req, res) => {
  const page = req.params.page * 100;
  RestaurantsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).limit(page);
});

app.get("/users", (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("createUser", async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("Server running on port: 3001");
});
