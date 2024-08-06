exports.joinRequestContent = ({ name, place,registrationNo, phone, whatsapp, userId }) => {

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
                <td>${phone}</td>
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

    let content = ` Dear ${name} <br/><br/><br/>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #ff5733;
        }
        h2 {
            color: #333;
        }
        a {
            color: #ff5733;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You for Joining RitzMotoClub!</h1>
        <h2>Welcome to the Club!</h2>
        <p>We're excited to have you as a member of RitzMotoClub, the premier community for Maruti Ritz enthusiasts. Your registration has been successfully completed, and we can't wait to share our passion for the Maruti Ritz with you.</p>
        <h2>What's Next?</h2>
        <ul>
            <li><strong>Exclusive Content:</strong> As a member, you'll get access to exclusive content, tips, and resources.</li>
            <li><strong>Community Engagement:</strong> Connect with fellow members, share your experiences, and join discussions in our online forums.</li>
            <li><strong>Special Events:</strong> Be the first to know about our upcoming events, meetups etc.</li>
            <li><strong>Member Benefits:</strong> Enjoy special discounts, promotions, and offers from our partners.</li>
        </ul>
        <h2>Stay Connected</h2>
        <p>Make sure to follow us on social media and check your email for the latest updates and announcements.</p>
        <ul>
            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/rmc.ritzmotoclub/" target="_blank">RitzMotoClub Facebook Page</a></li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/_ritzmotoclub_/" target="_blank">@RitzMotoClub</a></li>
            <li><strong>WhatsApp Channel:</strong> <a href="https://whatsapp.com/channel/0029Va9yQkS2UPBLU1ScUF3b" target="_blank">@RitzMotoClub</a></li>
        </ul>
        <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@ritzmotoclub.com">support@ritzmotoclub.com</a>.</p>
        <p>Thank you for joining RitzMotoClub. We're thrilled to have you with us on this exciting journey!</p>
        <p>Happy Driving!</p>
        <p>Team RitzMotoClub (RMC)) </p>
    </div>
    `

    return content;

}