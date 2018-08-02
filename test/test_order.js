require("../db")
let orderService = require("../service/order");

async function testAddOrder() {
    let order={
        productId:"5b4817e602d9ef25d81e515b",
        count:1,
        productPrice:1
    }
    let res = await orderService.addOrders(order);
    console.log(res);
}
async function testShowOrders() {
    let res = await orderService.showOrders();
    console.log(res);
}
//testAddOrder()
testShowOrders()