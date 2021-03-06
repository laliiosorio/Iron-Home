const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
  }
},
  { timestamps: true }
)


const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
