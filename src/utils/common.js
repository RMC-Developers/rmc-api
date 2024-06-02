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

exports.createRequestAcceptOrDeclineContent = (name,userId)=>{

    try {

        let accept_url = `https://rmc-api-phinahas-projects-41da129b.vercel.app/v1/user/general/validate-join-request?state=${true}&userId=${userId}`;
        let reject_url = `https://rmc-api-phinahas-projects-41da129b.vercel.app/v1/user/general/validate-join-request?state=${false}&userId=${userId}`;



        let htmlContent = `<h3>Hi Admin,</h3> ${name} is showing an intrest to join with us. <br/>
        What is you descision about it ? <br/>
            <a href =${accept_url}>Accept</a> <br/>
            <a href =${reject_url}>Reject</a> 
        `

        return htmlContent;


        
    } catch (error) {
        console.log(error);
        throw error;
    }


}