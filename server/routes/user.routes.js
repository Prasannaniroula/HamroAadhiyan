import express from "express"

const route = express.Router();

route.get('/',(req,res)=>{
    res.send("Hello welcome to the dark world");
})


export {route};