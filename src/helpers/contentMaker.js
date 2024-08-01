exports.joinRequestContent = ({ name, email, phone, whatsapp, userId }) => {

    try {

        let accept_url = `https://rmc-api-phinahas-projects-41da129b.vercel.app/v1/user/general/validate-join-request?state=${true}&userId=${userId}`;
        let reject_url = `https://rmc-api-phinahas-projects-41da129b.vercel.app/v1/user/general/validate-join-request?state=${false}&userId=${userId}`;

        let htmlContent = `
    <h3>Hi Admin,</h3>
    ${name} is showing an interest to join with us. <br/>
    Details about the customer:
    <br/><br/>
    <table border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>Email</th>
            <th>Phone Number</th>
            <th>WhatsApp Number</th>
        </tr>
        <tr>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${whatsapp}</td>
        </tr>
    </table>
    <br/>
    What is you descision about it ? <br/>
    <a href =${accept_url}>Accept</a> <br/>
`;


        return htmlContent;



    } catch (error) {
        console.log(error);
        const err = new Error("Content maker issue, error: " + error.message);
        throw err;
    }

}


exports.notifyCustomerAboutAdminApprovel = ({ name }) => {

    let content = ` Dear ${name} <br/><br/><br/>

Welcome to the RMC!
We're excited to have you as a member of RitzMotoClub, the premier community for Maruti Ritz enthusiasts. Your registration has been successfully completed, and we can't wait to share our passion for the Maruti Ritz with you.
<br/><br/>
What's Next?<br/>
Exclusive Content: As a member, you'll get access to exclusive content, tips, and resources.
Community Engagement: Connect with fellow members, share your experiences, and join discussions in our WhatsApp Group.
Special Events: Be the first to know about our upcoming events, meetups.
Member Benefits: Enjoy special discounts, promotions, and offers from our partners.
<br/><br/>
Stay Connected<br/>
Make sure to follow us on social media and check your email for the latest updates and announcements.
<br/><br/>
Facebook: https://www.facebook.com/rmc.ritzmotoclub<br/><br/>
Instagram: https://www.instagram.com/_ritzmotoclub_/<br/><br/>
WhatsApp Channel: https://whatsapp.com/channel/0029Va9yQkS2UPBLU1ScUF3b<br/><br/>

If you have any questions or need assistance, feel free to contact us at hello@ritzmotoclub.com
<br/><br/>
Thank you for joining RitzMotoClub. We're thrilled to have you with us on this exciting journey!
<br/><br/>
Happy Driving!
    `

    return content;

}