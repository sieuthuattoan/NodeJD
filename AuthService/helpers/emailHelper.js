const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
var sendMail = async (req,res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "nguoibinhthuong@gmail.com",
        pass: "Hung@123456"
    }
    });

    await transporter.verify((error,success)=>{
        if (error) {
            console.log(error);
          } else {
            console.log(success,"Server is ready to take our messages");
          }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <nguoibinhthuong@gmail.com>', // sender address
    to: "hunglq2709@gmail.com, sieuthuattoan@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
    });

    res.json({
        ok:"ok"
    });
}

Exporter = {
    sendMail: sendMail 
}

module.exports = Exporter;