const mongoose = require("mongoose");

const RestaurantsModelSchema = new mongoose.Schema({
  cuisine: {
    type: String,
    required: true,
  },
});

const RestaurantsModel = mongoose.model("restaurants", RestaurantsModelSchema);

module.exports = RestaurantsModel;
