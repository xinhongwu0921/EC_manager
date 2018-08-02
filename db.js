/*
let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect(`mongodb://localhost/${config.DB}`)//数据库连接
let db = mongoose.connection;
db.on("error",err=>{
    console.log(err);
})
db.once("open",()=>{
    console.log("连接成功");
})*/
let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect(`mongodb://localhost/${config.DB}`)
let db = mongoose.connection;
db.on("error",err=>{
    console.log(err);
})
db.once("open",()=>{
    console.log("连接成功");
})
