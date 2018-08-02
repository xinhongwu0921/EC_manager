const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    price:{
        type:String,
        required:[true,"价格不能为空"]
    },
    //库存
    stock:{
        type:Number,
        default:0
    },
    description:{
        type:String
    },
    isOnSale:{
        type:Boolean,
        default:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"商品分类不能为空"]
    },
    created:{
      type:Date,
      default:Date.now()
    }

});
module.exports = mongoose.model('products', schema)