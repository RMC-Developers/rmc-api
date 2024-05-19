const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fuelSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    date:{
        type:Schema.Types.Date,
        required: true
    },
    odometerReading:{
        type:Schema.Types.Number,
        required: true
    },
    volume:{
        type:Schema.Types.Number,
        required: true
    },
    unitPrice:{
        type:Schema.Types.Number,
        required: true
    },
    note:{
        type:Schema.Types.String,

    },
    fullTank:{
        type:Schema.Types.Boolean,
        default:false
    }
    
});

module.exports = mongoose.model("Fuel",fuelSchema);


