const mongoose = require("mongoose");

const ProfilUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
    },

    size: {
      type: Number,
    },
    hairColor: {
      type: String,
    },
    hairSize: {
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.model("ProfilUser", ProfilUserSchema);
