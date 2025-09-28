
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import route from "./routes/user.routes.js";
import connectDB from "./config/mongodb.js";


const app = express();
const port = process.env.PORT|| 4000; 


app.use(express.json())

app.use("/api/auth",route); 

const startServer = async()=>{
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`🚀 Server running at: http://localhost:${port}/`);
          });
        
    } catch (error) {
        console.error(error.message);
        
    }
}
startServer();
