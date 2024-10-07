const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  membershipId: {
    type: Schema.Types.Number,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },

  password: {
    type: Schema.Types.String,
  },

  otp:{
    type:Schema.Types.String
  },

  personalDetails:{
    dob:Schema.Types.Date,
    phone:Schema.Types.Number,
    phoneCountryCode:Schema.Types.Number,
    whatsappNumber:Schema.Types.Number,
    whatsappNumberCountrCode:Schema.Types.Number,
    bloodGroup:Schema.Types.String,
    willingToDonate:Schema.Types.Boolean,
    address:Schema.Types.String,
    pincode:Schema.Types.Number,
    postOffice:Schema.Types.String,
    district:Schema.Types.String,
    state:Schema.Types.String,

  },

  vehicleDetails:{
    registrationNumber:Schema.Types.String,
    colour:Schema.Types.String,
    registeredYear:Schema.Types.String,
    variant:Schema.Types.String,
    chasisNumber:Schema.Types.String,
    engineNumber:Schema.Types.String,
    insuranceUpTo:Schema.Types.Date,
    pucUpto:Schema.Types.Date,
    fitnessUpto:Schema.Types.Date,
    taxUpto:Schema.Types.Date
  },

  adminVerified:{
    type:Schema.Types.Boolean,
    default:false,
  },
  deleted:{
    type:Schema.Types.Boolean,
    default:false,
  }

});

module.exports = mongoose.model("User",userSchema);


