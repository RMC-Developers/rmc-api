const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the collection for which the counter is used
  seq: { type: Number, default: 0 }, // The current sequence number
});

module.exports = mongoose.model('Counter', counterSchema);
