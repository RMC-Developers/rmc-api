exports.joinRequestContent = ({name, email, phone, whatsapp,userId }) => {

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