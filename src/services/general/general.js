const ObjectId = require("mongoose").Types.ObjectId;

const Fuel = require('../../models/Fuel');
const Service = require('../../models/Service');
const ServiceCategories = require('../../models/ServiceCategory');

const utils = require('../../utils/efficiency')


exports.addFuelEntry = async ({ userId, date, odometerReading, volume, unitPrice, note, fullTank }) => {
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

        return { statusCode: 200, message: "entry saved successfully" }



    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.addServiceEntry = async ({ userId, date, odometerReading, inDetail, totalCost, note }) => {
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

        return { statusCode: 200, message: "entry saved successfully" }



    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServiceCategories = async () => {
    try {

        const serviceCategoriesFromDb = await ServiceCategories.find();

        return { statusCode: 200, categories: serviceCategoriesFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.efficiencyCalculator = async ({ userId }) => {
    try {

        //const fuelDataFromDb = await Fuel.find({user:new ObjectId(userId)}).sort({date:1});

        const fuelDataFromDb = await Fuel.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $limit: 2
            }
        ])

        if (fuelDataFromDb.length < 2) return { statusCode: 409, message: "Not enough data for calculations" }

        let distance = fuelDataFromDb[0].odometerReading - fuelDataFromDb[1].odometerReading;
        // const sum = fuelDataFromDb.reduce((accumulator, current) => accumulator + current.volume, 0);
        // let totalVolume = sum - fuelDataFromDb[fuelDataFromDb.length -1].volume;

        let volume = fuelDataFromDb[0].volume;



        let mileage = utils.KilometerForOneLiter(distance, volume);
        let costFor1Km = utils.costForOneKilometer(fuelDataFromDb[0].unitPrice, mileage);
        let fuelFor1Km = utils.fuelForOneKilometer(mileage);


        const fuelAnalytics = await Fuel.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $group: {
                    _id: null,
                    firstOdometerReading: { $first: "$odometerReading" },
                    lastOdometerReading: { $last: "$odometerReading" },
                    totalVolumeOfFuelConsumed: {
                        $sum: "$volume"
                    },
                    totalCostForFuelConsumed: {
                        $sum: { $multiply: ["$unitPrice", "$volume"] }
                    }
                }
            },
            {
                $project: {
                    totalDistanceTravelled: { $subtract: ["$firstOdometerReading", "$lastOdometerReading"] },
                    totalVolumeOfFuelConsumed: 1,
                    totalCostForFuelConsumed: 1
                }
            }
        ])

        let analytics = {
            totalDistance: distance,
            totalVolume: volume,
            mileage: mileage,
            costFor1Km: costFor1Km,
            fuelFor1Km: fuelFor1Km

        }

        return { statusCode: 200, data: fuelDataFromDb, analytics: fuelAnalytics }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fuelEfficiencyReport = async ({ userId }) => {
    try {

        const fuelDataFromDb = await Fuel.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $limit: 2
            }
        ])

        if (fuelDataFromDb.length < 2) return { statusCode: 409, message: "Not enough data for calculations" }

        let distance = fuelDataFromDb[0].odometerReading - fuelDataFromDb[1].odometerReading;
        let volume = fuelDataFromDb[0].volume;

        let mileage = utils.KilometerForOneLiter(distance, volume);
        let costFor1Km = utils.costForOneKilometer(fuelDataFromDb[0].unitPrice, mileage);
        let fuelFor1Km = utils.fuelForOneKilometer(mileage);




        let analytics = {
            mileage: mileage,
            costFor1Km: costFor1Km,
            fuelFor1Km: fuelFor1Km
        }

        return { statusCode: 200, data: fuelDataFromDb, analytics: analytics }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fuelReport = async ({ userId }) => {
    try {

        const consumptionReport = await Fuel.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $group: {
                    _id: null,
                    firstOdometerReading: { $first: "$odometerReading" },
                    lastOdometerReading: { $last: "$odometerReading" },
                    totalVolumeOfFuelConsumed: {
                        $sum: "$volume"
                    },
                    totalCostForFuelConsumed: {
                        $sum: { $multiply: ["$unitPrice", "$volume"] }
                    }
                }
            },
            {
                $project: {
                    totalDistanceTravelled: { $subtract: ["$firstOdometerReading", "$lastOdometerReading"] },
                    totalVolumeOfFuelConsumed: 1,
                    totalCostForFuelConsumed: 1
                }
            }
        ])

        if (consumptionReport.length == 0) return { statusCode: 409, message: "No data to show" }
        return { statusCode: 200, consumptionReport: { totalFuelConsumed: (consumptionReport[0]?.totalVolumeOfFuelConsumed).toFixed(2) || null, totalCostForFuelConsumed: (consumptionReport[0]?.totalCostForFuelConsumed).toFixed(2) || null, totalDistanceTravelled: (consumptionReport[0]?.totalDistanceTravelled).toFixed(2) || null } }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServiceLog = async ({ userId, page }) => {
    try {



        const servicesFromDb = await Service.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },

            {
                "$unwind": "$inDetail"
            },
            {
                "$lookup": {
                    "from": "servicecategories",
                    "localField": "inDetail.category",
                    "foreignField": "_id",
                    "as": "categoryData"
                }
            },
            {
                "$unwind": "$categoryData"
            },
            {
                "$addFields": {
                    "inDetail.category": "$categoryData"
                }
            },
            {
                "$group": {
                    "_id": {
                        "serviceId": "$_id",
                        "categoryId": "$inDetail.category._id"
                    },
                    "user": { "$first": "$user" },
                    "date": { "$first": "$date" },
                    "odometerReading": { "$first": "$odometerReading" },
                    "totalCost": { "$first": "$totalCost" },
                    "note": { "$first": "$note" },
                    "__v": { "$first": "$__v" },
                    "category": { "$first": "$inDetail.category" },
                    "items": {
                        "$push": {
                            "item": "$inDetail.item",
                            "price": "$inDetail.price"
                        }
                    },
                    "sumPrice": { "$sum": "$inDetail.price" }
                }
            },
            {
                "$group": {
                    "_id": "$_id.serviceId",
                    "date": { "$first": "$date" },
                    "odometerReading": { "$first": "$odometerReading" },
                    "inDetail": {
                        "$push": {
                            "category": "$category.name",
                            "sumPrice": "$sumPrice"
                        }
                    }
                }
            },
            {
                "$sort": { "date": -1 }
            }

        ])


        if (servicesFromDb.length == 0) return { statusCode: 409, message: "No service history found" }

        return { statusCode: 200, serviceLog: servicesFromDb }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getFuelLog = async ({ userId }) => {
    try {

        const fuelDataFromDb = await Fuel.aggregate([
            {
                $match: {
                    user: new ObjectId(userId)
                }
            },
            {
                $sort: {
                    date: -1
                }
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    odometerReading: 1,
                    volume: 1,
                    unitPrice: 1,
                    note: 1,
                    fullTank: 1,
                }
            }
        ])

        if (fuelDataFromDb.length == 0) return { statusCode: 409, message: "No data available" }

        let finalArray = [];

        for (let i = 0; i < fuelDataFromDb.length; i++) {
            //console.log(fuelDataFromDb)
            let obj = {};
            obj.distance = fuelDataFromDb[i].odometerReading - fuelDataFromDb[i + 1]?.odometerReading || null;
            obj.mileage = (obj.distance / fuelDataFromDb[i].volume).toFixed(2);
            obj.volume = fuelDataFromDb[i].volume;
            obj.date = fuelDataFromDb[i].date;
            obj.odometerReading = fuelDataFromDb[i].odometerReading;
            obj.unitPrice = fuelDataFromDb[i].unitPrice;
            obj.notes = fuelDataFromDb[i].note;
            obj.fullTank = fuelDataFromDb[i].fullTank;
            obj.totalCost = fuelDataFromDb[i].volume * fuelDataFromDb[i].unitPrice;

            finalArray.push(obj);
        }

        return { statusCode: 200, fuelLog: finalArray }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServiceConsumptionReport = async ({ userId }) => {
    try {

        const serviceDataFromDb = await Service.aggregate([
            {
                $match: {
                    user: new ObjectId(userId),
                }
            },
            {
                $group:{
                    _id:null,
                    totalServices:{$sum:1},
                    totalServiceCost:{$sum:'$totalCost'}
                }
            },
            {
                $project:{
                    _id:0,
                    totalServiceCost:1,
                    totalServices:1
                }
            }
           

        ])

        if(serviceDataFromDb.length === 0) return {statusCode:409,message:"No enough data available for calculation"}

        return { statusCode: 200, report: serviceDataFromDb[0] };


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServiceRateSplitUp = async ({ userId }) => {
    try {

        const serviceDataFromDb = await Service.aggregate([
            {
                $match: {
                    user: new ObjectId(userId),
                }
            },
            {
                $unwind:'$inDetail'

            },
            {
                "$lookup": {
                    "from": "servicecategories",
                    "localField": "inDetail.category",
                    "foreignField": "_id",
                    "as": "categoryData"
                }
            },
            {
                "$unwind": "$categoryData"
            },
            {
                "$addFields": {
                    "inDetail.category": "$categoryData"
                }
            },
            {
                $group:{
                    _id:'$inDetail.category._id',
                    "category": { "$first": "$inDetail.category.name" },
                    "totalAmount":{"$sum": "$inDetail.price" }

                }
            },        
            {
                $project:{
                    _id:0,
                    category:1,
                    totalAmount:1,
                    
                }
            }
        ])

        if(serviceDataFromDb.length === 0) return {statusCode:409,message:"No enough data available for calculation"}

        return { statusCode: 200, report: serviceDataFromDb };


    } catch (error) {
        console.log(error);
        throw error;
    }
}