const nodemailer = require('nodemailer')

module.exports = async (userEmail,subject,htmlTemplate)=>{

try {
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.APP_Email_Address,
            pass:process.env.APP_Email_Password
        }
    })

    const mailOptions = {
        from:process.env.APP_Email_Address,
        to:userEmail,
        subject:subject,
        html:htmlTemplate
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('email sent '+ info.response)

} catch (error) {
    console.log(error);
}

}