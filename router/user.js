let router = require("express").Router();
let userService = require("../service/user");
router.get("/:username",async (req,res)=>{
    let user = await userService.findUser(req.params.username);
    res.success(user)
});

//用户注册
router.post("/register",async(req,res)=>{
    let user = await userService.userRegister(req.body);
    res.success(user)
})

//登录
router.post("/login",async(req,res)=>{
    let token = await userService.userLogin(req.body);
    res.success({
        token
    })
})
//删除
router.delete("/:username",async(req,res)=>{
    await  userService.deleteUser(req.params.username);
    res.success()
})
module.exports=router