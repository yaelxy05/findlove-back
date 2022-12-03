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
  password: {
    type: String,
    required: true,
    min: 5,
  },
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
},
{ timestamps: true });

mongoose.model("User", UserSchema);
