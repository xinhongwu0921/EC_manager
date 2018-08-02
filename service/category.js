//想当与service层

let Category = require("../model/category");//导入model
let config = require("../config");

/**
 * 添加商品的类别
 * @param category
 * @returns {Promise<*>}
 */
async function addCategory(category) {
   return await Category.create(category);//mongoose的api
}

/**
 * 分页显示商品类别
 * @param page
 * @returns {Promise<*>}
 */
async function getCategoryPage(page=1) {
    let data =await Category.find().skip(config.pageCount*(page-1)).limit(config.pageCount).sort("created").select("-__v");
    return data
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExit(id) {
    let res = await Category.findOne({_id:id});
    if(!res){
        throw Error`${id}不存在`
    }
}

/**
 * 更新分类
 * @param id
 * @param update
 * @returns {Promise<void>}
 */
async function changeCategory(id,update) {
    await isIdExit(id)
    let res = await Category.updateOne({_id:id},update);
    if(res.n<1){
        throw Error ("更新失败")
    }
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    await isIdExit(id)
    let res = await Category.deleteOne({_id:id});
    if(res.n<1){
        throw Error("操作失败")
    }
}
module.exports={
    addCategory,
    getCategoryPage,
    changeCategory,
    deleteCategory
}
