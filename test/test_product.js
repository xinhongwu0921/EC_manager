require("../db")
let productService = require("../service/product");
async function testAddProduct() {
    let product=[
    {
        name: "外人7990",
        price: "19999.9",
        stock: 120,
        description: "这是一台性能超级强劲的电脑，打LOL，DOTA2，吃鸡都不在话下。",
        category: "5b475f84475ba344945b84d3"
    },
    {
        name: "联9450",
        price: "4000.1",
        stock: 1000,
        description: "这是一台适用于办公，影音，娱乐的电脑。",
        category: "5b475f84475ba344945b84d2"
    }

    ]
     let res =await productService.addProduct(product);
    console.log(res);
}
async function testGetProduct() {
    let res = await productService.showProduct();
    console.log(res);
}
async function testUpdate() {
    await productService.updateProduct("5b47656242ecb04a4c097911",{price: "24555"})

}
async function testDelete() {
    await productService.deleteProduct("5b47656242ecb04a4c097911")
}
testAddProduct()
//testGetProduct()
//testUpdate()
//testDelete()