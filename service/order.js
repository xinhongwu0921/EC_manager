let Order = require("../model/order");
let productService = require("../service/product");
let config = require("../config");
let Big = require("big.js");

/**
 * 添加订单
 * @param order
 * @returns {Promise<order>}
 */
async function addOrders(order) {
    let produ =await productService.getProductById(order.productId);
    if(produ.stock<order.count){
        throw Error ("库存不足")
    }

    order.productName=produ.name;
    order.productPrice=produ.price;
    order.totalPrice=Big(order.productPrice).times(order.count)

    let orders = Order.create(order);

    //减少库存
   await productService.updateProduct(order.id,{stock:produ.stock-order.count})
    return orders;
}

/**
 * 展示订单
 * @param page
 * @returns {Query}
 */
function showOrders(page=1) {
    let res = Order.find().skip(config.pageCount*(page-1)).limit(config.pageCount).sort("created").select("-__v");
    return res;
    
}module.exports={
    showOrders,
    addOrders
};