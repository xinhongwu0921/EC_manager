let Product = require("../model/product");
let config = require("../config");

//添加商品
/**
 * 添加商品
 * @param product
 * @returns {Promise<*>}
 */
async function addProduct(product) {
   return await Product.create(product)
}

//分页显示商品
/**
 * 分页显示商品
 * @param page
 * @returns {Promise<*>}
 */
async function showProduct(page=1) {
    let res = await Product.find().skip(config.pageCount*(page-1)).limit(config.pageCount).sort("created").select("-__v");
    return res
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExit(id) {
    let res = await Product.findOne({_id:id});
    if(!res){
        throw Error (`${id}不存在`)
    }
}

async function getProductById(id) {
    await isIdExit(id)
    let res = await Product.findOne({_id:id});
    return res
}

/**
 * 修改商品
 * @param id
 * @param update
 * @returns {Promise<void>}
 */
async function updateProduct(id,update) {
    await isIdExit(id)
    let res = await Product.updateOne({_id:id},update);
    if(res.n<1){
        throw Error ("修改失败")
    }

}

/**
 * 删除商品
 * @param id
 * @returns {Promise<void>}
 */
async function deleteProduct(id) {
    await isIdExit(id);
    let res = await Product.deleteOne({_id:id});
    if(res.n<1){
        throw Error( "删除失败")
    }
}

module.exports={
    showProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
}