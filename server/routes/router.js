const Router=require('express').Router();
const path=require("path");

Router.get("/ping",(req,res)=>{
    res.end("pong");
})


module.exports=Router;
