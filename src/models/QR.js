const mongoose = require("mongoose");
const Counter = require('./Counter')

const Schema = mongoose.Schema;

// Define the QR schema
const qrSchema = new Schema({

  id: {
    type: Number,
    unique: true, // Ensure the id is unique
  },

  membershipId: {
    type: Schema.Types.String,
    ref:'User',
    default: null
  },

  qrCode: {
    type: Schema.Types.String,
    default: null
  },

  createdAt: {
    type: Schema.Types.Date,
    default: new Date()
  },

  toLandingPage: {
    type: Schema.Types.Boolean,
    default: true
  },
  
  deleted: {
    type: Schema.Types.Boolean,
    default: false,
  }
});

// Pre-save hook to auto-increment the `id` field
qrSchema.pre('save', async function (next) {
  const doc = this;

  if (doc.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'qr' },   // Assuming "qr" is the name of the counter you want to use for QR codes
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Create the counter document if it doesn't exist
      );

      doc.id = counter.seq;  // Assign the auto-incremented sequence to the `id` field
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(); // If the document is not new, skip auto-increment logic
  }
});

module.exports = mongoose.model("Qr", qrSchema);
