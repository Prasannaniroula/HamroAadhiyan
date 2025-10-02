import nodemailer from "nodemailer";
import "dotenv/config";



const transporter = nodemailer.createTransport({
    secure:false,
    host:`${process.env.SMTP_SERVER}`,
    port: 587,
    auth:{
        user:process.env.SMTP_USERNAME,
        pass:process.env.SMTP_PASSWORD,
    },
})

transporter.verify()
  .then(() => console.log("SMTP connected"))
  .catch(err => console.error("SMTP connection error:", err));

export default transporter;