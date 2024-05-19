exports.KilometerForOneLiter = (kilometer,totalLiter)=>{
    try {

        let result = kilometer/totalLiter;

        return result.toFixed(2);

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.costForOneKilometer = (fuelUnitPrice,kilometerPerLiter)=>{
    try {

        let result = fuelUnitPrice/kilometerPerLiter;

        return result.toFixed(2);

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fuelForOneKilometer = (kilometerPerLiter)=>{
    try {

        let result = 1/kilometerPerLiter;

        return result.toFixed(2);

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}