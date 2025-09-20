import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {route} from "./routes/user.routes.js";


const app = express();
const port = process.env.PORT|| 4000; 

app.use("/", route); 


const conn_port = app.listen(port,(req,res)=>{
    console.log(`it's working on port : http://localhost:${port}/`);
})
if(!conn_port){
    console.log("Error occured");
}
