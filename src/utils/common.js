exports.GenerateOTP = ()=>{
    try {

        const randomNum = Math.floor(Math.random() * 10000);
        const otp = randomNum.toString().padStart(4, "0");
        return otp;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}