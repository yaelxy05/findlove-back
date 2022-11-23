const mongoose = require("mongoose");

const ProfilUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  size: {
    type: Number,
  },
  hairColor: {
    type: String,
  },
  hairSize: {
    type:  String
  }

});

mongoose.model("ProfilUser", ProfilUserSchema);
