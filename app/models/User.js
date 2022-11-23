const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  sexe: {
    type: String,
    required:true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  username: String,
  hash: String,
  salt: String,
  profilUserId: { type: Schema.Types.ObjectId, ref: "ProfilUser" },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true
  }
});

mongoose.model("User", UserSchema);
