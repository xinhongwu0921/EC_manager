require("../db");
let categoryService = require("../service/category");
async function testAddCategory() {
    let category =[
        {name:"家具"},
        {name:"电脑"},
        {name:"手机"},
        {name:"衣服"}
    ]
    let res = await categoryService.addCategory(category);
    console.log(res);
}
async function testGetCategory() {
    let res = await categoryService.getCategoryPage();
    console.log(res);
}
async function testUpdate() {
    await categoryService.changeCategory("5b475f84475ba344945b84d5",{name:"玩具"})
}
async function testDelete() {
    await categoryService.deleteCategory("5b475f84475ba344945b84d5")
}
//testAddCategory()
//testGetCategory()
//testUpdate()
testGetCategory()
//testDelete()