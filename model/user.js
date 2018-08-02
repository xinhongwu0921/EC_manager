let mongoose = require("mongoose");
const schema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"用户名不能为空"]
    },
    password:{
        type:String,
        required:[true,"密码不能为空"]
    },
    age:{
        type:Number,
        min:[0,"年龄不能小于0"],
        max:[120,"年龄不能大于120"],
        default:15
    },
    role:{
        type:Number,
        default:0
    },
    created:{
        type:Date,
        default:Date.now()
    }

})
module.exports=mongoose.model("users",schema);