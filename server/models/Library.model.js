const { Schema, model } = require("mongoose");


const librarySchema = new Schema({
  number: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    min: 1,
    max: 15,
  },
  supply: {
    videoBeam: {
      type: Boolean,
      required: true,
      default: false
    },
    board: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  avaiable: {
    type: Boolean,
    required: true,
    default: true
  }
},
  { timestamps: true }
)


const Library = model('Library', librarySchema);

module.exports = Library;
