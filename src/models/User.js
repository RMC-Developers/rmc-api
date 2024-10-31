const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  membershipId: Schema.Types.Number,
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: Schema.Types.String,
  otp: Schema.Types.String,

  personalDetails: {
    dob: { type: Schema.Types.Date, default: null },
    phone: { type: Schema.Types.Number, default: null },
    phoneCountryCode: { type: Schema.Types.Number, default: null },
    whatsappNumber: { type: Schema.Types.Number, default: null },
    whatsappNumberCountryCode: { type: Schema.Types.Number, default: null },
    bloodGroup: { type: Schema.Types.String, default: null },
    willingToDonate: { type: Schema.Types.Boolean, default: false },
    address: { type: Schema.Types.String, default: null },
    pincode: { type: Schema.Types.Number, default: null },
    postOffice: { type: Schema.Types.String, default: null },
    district: { type: Schema.Types.String, default: null },
    state: { type: Schema.Types.String, default: null },
  },

  vehicleDetails: {
    registrationNumber: { type: Schema.Types.String, default: null },
    colour: { type: Schema.Types.String, default: null },
    registeredYear: { type: Schema.Types.String, default: null },
    variant: { type: Schema.Types.String, default: null },
    chasisNumber: { type: Schema.Types.String, default: null },
    engineNumber: { type: Schema.Types.String, default: null },
    insuranceUpTo: { type: Schema.Types.Date, default: null },
    pucUpto: { type: Schema.Types.Date, default: null },
    fitnessUpto: { type: Schema.Types.Date, default: null },
    taxUpto: { type: Schema.Types.Date, default: null },
  },

  adminVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  deleted: {
    type: Schema.Types.Boolean,
    default: false,
  },
});




module.exports = mongoose.model("User",userSchema);


