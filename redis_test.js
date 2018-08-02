let redis = require("redis");
require("./db")
let client = redis.createClient();
const util = require('util');
const getAsync = util.promisify(client.get).bind(client);
const lrangeAsync =util.promisify(client.lrange).bind(client);
let llenAsync = util.promisify(client.llen).bind(client);
client.on("error",err=>{
    console.log(err.toString());
})
async function testSetAndGet() {
    client.set("abc","和订货会")
    let res = await getAsync("abc");
    console.log(res);
}
//testSetAndGet()

async function testList() {
    client.rpush("bbb","d");
    client.rpush("bbb","c");
   let res =await lrangeAsync("bbb",0,-1);
   console.log(res);
}
//testList()

let Product = require("./model/product");
async function getProducts() {
    let allProducts =await Product.find();
    console.log(allProducts);
    allProducts.forEach(p=>{
        client.rpush("pro",JSON.stringify(p))
    })
}
//getProducts()

let config = require("./config");
let key="pro"
async function getProductFromPage(page=1) {
    let len = await llenAsync(key)
    if (len > 0) {

        let skip = config.pageCount * (page - 1)
        let stop = skip + config.pageCount - 1
        let list = await lrangeAsync(key, skip, stop);
        console.log(list);
             }else{
        let res = await Product.find().skip(config.pageCount*(page-1)).limit(config.pageCount).sort("created").select("-__v");
        return res
        }
}
getProductFromPage()


