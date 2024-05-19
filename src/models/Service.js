const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({

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
    inDetail:[{
        item:Schema.Types.String,
        category:Schema.Types.ObjectId,
        price:Schema.Types.Number
    }],
    totalCost:{
        type:Schema.Types.Number,
        required: true
    },
    note:{
        type:Schema.Types.String,
    },
    
    
});

module.exports = mongoose.model("Service",serviceSchema);


