const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qrSchema = new Schema({


  membershipId: {
    type: Schema.Types.String,
    ref:'User',
    default:null
  },

  qrCode:{
    type:Schema.Types.String,
    default:null
  },

  createdAt:{
    type:Schema.Types.Date,
    default:new Date()
  },

  toLandingPage:{
    type:Schema.Types.Boolean,
    default:true
  },
  
  deleted:{
    type:Schema.Types.Boolean,
    default:false,
  }

});

module.exports = mongoose.model("Qr",qrSchema);


