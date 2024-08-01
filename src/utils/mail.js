const nodemailer = require("nodemailer");

const config = require('../configurations/constants')

exports.sentMail = async({toAddress='samarhamsa@gmail.com',subject='Test',content=`This is a test message`})=>{

    try {
        let transporter = nodemailer.createTransport({
            host: config.MAIL_HOST,
            port: config.MAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: config.MAIL_USERNAME, // generated ethereal user
              pass: config.MAIL_PASSWORD, // generated ethereal password
            },
          });
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: config.MAIL_USERNAME, // sender address
            to:toAddress, // list of receivers
            subject:subject, // Subject line
            html:content, // html body
          });

          console.log(info)
        
          return; 

        
    } catch (error) {
        console.log(error);
        throw error
    }

}


exports.notifiyingAdminAboutTheNewRequest = async(mailContent)=>{

  try {
    let transporter = nodemailer.createTransport({
        host: config.MAIL_HOST,
        port: config.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: config.MAIL_USERNAME, // generated ethereal user
          pass: config.MAIL_PASSWORD, // generated ethereal password
        },
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: config.MAIL_USERNAME, // sender address
        to:"join@ritzmotoclub.com", // list of receivers
        subject:"Join Request", // Subject line
        html:mailContent, // html body
      });

      console.log(info)
    
      return; 

    
} catch (error) {
    console.log(error);
    throw error
}


}
 