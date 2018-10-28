const mongoose = require('mongoose')

const CharacterSchema= new mongoose.Schema({
  chName: {
    type: String,
    default: ''
  },
  chRace: {
    type: String,
    default: ''
  },
  chClass: {
    type: String,
    default: ''
  },
  chIsDeleted: {
    type: Boolean,
    default: false
  },
  chCreationDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
