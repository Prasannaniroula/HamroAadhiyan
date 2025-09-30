import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: smtp.mailersend.net,
    port: 587,
    auth:{
        user:'MS_gIBRuH@test-3m5jgrok0qogdpyo.mlsender.net',
        pass:'mssp.1ZXAK12.0r83ql36jyvlzw1j.ZBqMQWs',
    },
    logger:true,
    debug:true,

})
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
        console.log(success);
    }
});

export default transporter;