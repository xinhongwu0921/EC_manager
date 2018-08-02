let User = require("../model/user");
let config = require("../config");
let lxj = require("lxj-crypto");

async function findUser(username) {
    let res = await User.findOne({username:username}).select("-__v -password");
    if(!res){
        throw Error(`名字为${username}的用户不存在`)
    }
    return res;
}
//判断用户名是否存在
async function isUserExit(username) {
    let res = await User.findOne({username:username});
    if(!res){
        throw Error(`名字为${username}的用户不存在`)
    }
}

//用户注册
async function userRegister(user) {
    let res = await User.findOne({usernaem:user.username});
    if(res){
        throw Error(`名字为${user.username}的用户已存在`)
    }
    user.password=lxj.sha1Hmac(user.password,user.username);
    user.role=0;
    user.created=Date.now();
   let res2=await User.create(user)
    res2.password='';
    return res2;
}

async function userLogin(user) {
    user.password=lxj.sha1Hmac(user.password,user.username)
    //2.去数据库查询是否存在
    let res = await User.findOne({username: user.username, password: user.password});
    if (!res) {
        throw Error("用户名或者密码错误")
    }

    //3. 给用户生成一个token，可以用aes算法生成
    let tokenData = {
        username: user.username,
        expire: Date.now() + config.TokenExpire
    };

    let token = lxj.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token
}

async function deleteUser(username) {
     await isUserExit(username);
    let res = await User.deleteOne({username:username});
    if(res.n<1){
        throw Error ("删除失败")
    }
}
module.exports={
    userRegister,
    userLogin,
    deleteUser,
    findUser
}
