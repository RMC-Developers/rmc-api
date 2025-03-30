const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the QR schema
const qrSchema = new Schema({


  qrCode: {
    type: Schema.Types.String,
    default: null
  },

  deleted: {
    type: Schema.Types.Boolean,
    default: false,
  }
});



module.exports = mongoose.model("RMCQr", qrSchema);
