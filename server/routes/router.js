const Router=require('express').Router();
const path=require("path");

Router.get("/",(req,res)=>{
    res.sendFile(path.resolve("build","index.html"));
})
Router.get("*",(req,res)=>{
   res.redirect("/");
})

module.exports=Router;
