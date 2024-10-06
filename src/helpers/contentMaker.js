const {SERVER_DOMAIN} = require('../configurations/constants')

exports.joinRequestContent = ({ name, place,registrationNo, phone, whatsapp, userId }) => {

    try {

        let accept_url = `${SERVER_DOMAIN}/v1/user/general/validate-join-request?state=${true}&userId=${userId}`;
        let reject_url = `${SERVER_DOMAIN}/v1/user/general/validate-join-request?state=${false}&userId=${userId}`;

        let htmlContent = `
        <h3>Hi Admin,</h3>
        ${name} is showing an interest to join with us. <br/>
        Details about the customer:
        <br/><br/>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>Name</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>Mobile</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>WhatsApp Number</th>
                <td>${whatsapp}</td>
            </tr>
             <tr>
                <th>Car No</th>
                <td>${registrationNo}</td>
            </tr>
            <tr>
                <th>Place</th>
                <td>${place}</td>
            </tr>
        </table>
        <br/>
        What is your decision about it? <br/>
        <a href="${accept_url}">Accept</a> <br/>
    `;
    


        return htmlContent;



    } catch (error) {
        console.log(error);
        const err = new Error("Content maker issue, error: " + error.message);
        throw err;
    }

}


exports.notifyCustomerAboutAdminApprovel = ({ name }) => {

    let content = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333;">
    <table role="presentation" style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); width: 100%;">
        <tr>
            <td>
                <h4 style="color: #333,font-weight: bold;">Dear ${name}</h4>
                <h2 style="color: #333;">Welcome to the Club!</h2>
                <p>We're excited to have you as a member of RitzMotoClub, the premier community for Maruti Ritz enthusiasts. Your registration has been successfully completed, and we can't wait to share our passion for the Maruti Ritz with you.</p>
                <h2 style="color: #333;">What's Next?</h2>
                <ul>
                    <li><strong>Exclusive Content:</strong> As a member, you'll get access to exclusive content, tips, and resources.</li>
                    <li><strong>Community Engagement:</strong> Connect with fellow members, share your experiences, and join discussions in our WhatsApp Group.</li>
                    <li><strong>Special Events:</strong> Be the first to know about our upcoming events, meetups, etc.</li>
                    <li><strong>Member Benefits:</strong> Enjoy special discounts, promotions, and offers from our partners.</li>
                </ul>
                <h2 style="color: #333;">Stay Connected</h2>
                <p>Make sure to follow us on social media and check your email for the latest updates and announcements.</p>
                <ul>
                    <li><strong>Facebook:</strong> <a href="https://www.facebook.com/rmc.ritzmotoclub/" target="_blank" style="color: #ff5733;">RitzMotoClub</a></li>
                    <li><strong>Instagram:</strong> <a href="https://www.instagram.com/_ritzmotoclub_/" target="_blank" style="color: #ff5733;">RitzMotoClub</a></li>
                    <li><strong>WhatsApp Channel:</strong> <a href="https://whatsapp.com/channel/0029Va9yQkS2UPBLU1ScUF3b" target="_blank" style="color: #ff5733;">RitzMotoClub</a></li>
                </ul>
                <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:hello@ritzmotoclub.com" style="color: #ff5733;">hello@ritzmotoclub.com</a>.</p>
                <p>Thank you for joining RitzMotoClub. We're thrilled to have you with us on this exciting journey!</p>
                <p>Happy Driving!</p>
                <p>Team RMC </p>
            </td>
        </tr>
    </table>
</body>
</html>
    `

    return content;

}