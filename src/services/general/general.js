const Fuel = require('../../models/Fuel')


exports.addFuelEntry = async ({userId,date,odometerReading,volume,unitPrice,note,fullTank})=>{
    try {

        const fuelObj = new Fuel({
            user: userId,
            date: date,
            odometerReading: odometerReading,
            volume: volume,
            unitPrice: unitPrice,
            note: note,
            fullTank: fullTank
        })

        await fuelObj.save();

        return {statusCode:200,message:"entry saved successfully"}


        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.addServiceEntry = async ({userId,date,odometerReading,volume,unitPrice,note,fullTank})=>{
    try {

        const fuelObj = new Fuel({
            userId: userId,
            date: date,
            odometerReading: odometerReading,
            volume: volume,
            unitPrice: unitPrice,
            note: note,
            fullTank: fullTank
        })

        await fuelObj.save();

        return {statusCode:200,message:"entry saved successfully"}


        
    } catch (error) {
        console.log(error);
        throw error;
    }
}