const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },

  email: {
    type: Schema.Types.String,
    required: true,
  },

  password: {
    type: Schema.Types.String,
    required: true,
  },

  otp:{
    type:Schema.Types.String
  }

});

module.exports = mongoose.model("User",userSchema);


