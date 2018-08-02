let router = require("express").Router();
let orderService = require("../service/order");

router.get("/",async(req,res)=>{
    let orders = await orderService.showOrders(req.query.page);//req.query:获取地址栏传递的参数
    res.success(orders)
})
router.post("/",async(req,res)=>{
    let od = await orderService.addOrders(req.body);//req.body:post方法传递参数
    res.success(od)
})
module.exports=router;