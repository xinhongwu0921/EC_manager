let config = require("../config");
let userService = require("../service/user");
let crypto = require("lxj-crypto");

function isEnclud(url) {
    //先排除不需要token的接口
    include=[
        /.*\/user\/login/,
        /.*\/user\/register/
    ]
    //遍历数组，看是否在里面
   let isInclude=false;
    include.forEach(item=>{
        if(item.test(url)){
            isInclude=true
        }
    })
    return isInclude
}
module.exports=async(req,res,next)=>{
    // 先判断当前的url是否是需要token验证，登录和注册的接口是不需要token的
        if(!isEnclud(req.url)){
            console.log(req.url);
            // 1. 从header中取出token
            let token=req.get("token")
            if(!token){
                throw Error("token不存在")
            }
            // 2. 对token进行解码，看是否是伪造的token
            let tokenData;
            try {
                tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey))
            } catch (e) {
                throw Error("token不合法")
            }
            //3. 判断token是否过期
            if(tokenData<Date.now()){
                throw Error("token已过期")
            }
            //4. 可以根据tokenData中的username取出用户信息，为了给后续的请求使用
            let userInfo = await userService.findUser(tokenData.username);
            req.user=userInfo
        }
        next();


}