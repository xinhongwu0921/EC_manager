//全局错误，放到最前面
require("express-async-errors");
//http请求解析
let body = require("body-parser");
let morgan = require("morgan");
let userRouter = require("./router/user");
let categoryRouter = require("./router/category");
let productRouter = require("./router/product");
let orderRouter = require("./router/order");
require("./db");
let config = require("./config");
let express = require("express");
let app=express();
//注册日志处理中间件
app.use(morgan("combined"));
app.use(body.json());
//自定义中间件
app.use(require("./middleware/res_md"));
//token验证的中间件
app.use(require("./middleware/token_md"))
//权限校验的中间件
app.use(require("./middleware/permission_md"))
//错误处理中间件
app.use((err,req,res,next)=>{
    res.fail(err.toString())
})
//注册路由
app.use("/user",userRouter);
app.use("/category",categoryRouter)
app.use("/product",productRouter)
app.use("/order",orderRouter)
app.listen(config.PORT);
