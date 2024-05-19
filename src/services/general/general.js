const ObjectId = require("mongoose").Types.ObjectId;

const Fuel = require('../../models/Fuel');
const Service = require('../../models/Service');

const utils = require('../../utils/efficiency') 


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

exports.addServiceEntry = async ({userId,date,odometerReading,inDetail,totalCost,note})=>{
    try {

        const serviceObj = new Service({
            user: userId,
            date: date,
            odometerReading: odometerReading,
            inDetail: inDetail,
            totalCost: totalCost,
            note: note,
           
        })

        await serviceObj.save();

        return {statusCode:200,message:"entry saved successfully"}


        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.efficiencyCalculator = async({userId})=>{
    try {

        //const fuelDataFromDb = await Fuel.find({user:new ObjectId(userId)}).sort({date:1});

        const fuelDataFromDb = await Fuel.aggregate([
            {
                $match:{
                    user:new ObjectId(userId)
                }
            },
            {
                $sort:{
                    date:1
                }
            }
        ])

        if(fuelDataFromDb.length < 2) return {statusCode:409,message:"Not enough data for calculations"}

        let distance = fuelDataFromDb[fuelDataFromDb.length -1].odometerReading - fuelDataFromDb[0].odometerReading;
        console.log("distance: " + distance)
        const sum = fuelDataFromDb.reduce((accumulator, current) => accumulator + current.volume, 0);
        let totalVolume = sum - fuelDataFromDb[fuelDataFromDb.length -1].volume;
        console.log(totalVolume)

        let mileage = utils.KilometerForOneLiter(distance,totalVolume);
        let costFor1Km = utils.costForOneKilometer(fuelDataFromDb[fuelDataFromDb.length -1].unitPrice,mileage);
        let fuelFor1Km = utils.fuelForOneKilometer(mileage);

        let analytics = {
            totalDistance:distance,
            totalVolume:sum,
            mileage:mileage,
            costFor1Km:costFor1Km,
            fuelFor1Km:fuelFor1Km

        }

        return {statusCode:200,data:fuelDataFromDb,analytics:analytics}

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}