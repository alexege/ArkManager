const mongoose = require("mongoose");

const Map = mongoose.model(
  "Map",
  new mongoose.Schema(
    {
      title: String,
      name: String,
      points: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Point",
        },
      ],
      //   author: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "User",
      //   },
      img: String,
    },
    { timestamps: true }
  )
);

module.exports = Map;
