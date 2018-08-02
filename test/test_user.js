require("../db");
let userService = require("../service/user");

async function testUserRegister() {
    let user={
        username:"ddd",
        password:"123",
        age:100,
        role:100
    };
    let res = await userService.userRegister(user);
    console.log(res);
}
function testLogin() {
   let user={
        username:"ddd",
        password:"123"
    }
    let token = userService.userLogin(user);
    console.log(token);
}
async function testDelete() {
  await  userService.deleteUser("ddd")
}
testUserRegister()
//testLogin()
//testDelete();