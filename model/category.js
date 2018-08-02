//model相当于dao层

//使用mongoose进行数据库的映射
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"分类名不能为空"]
    },
    created:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('categorys', schema)//“categorys”：数据库名