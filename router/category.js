//相当于controller层
let router = require("express").Router();//使用express框架
let categoryService = require("../service/category");//导入service

router.get("/",async(req,res)=>{
    let categorys = await categoryService.getCategoryPage(req.query.page);

    res.success(categorys)
})
router.post("/",async(req,res)=>{
    let category =await categoryService.addCategory(req.body);
    res.success(category)
})
router.put("/:id" ,async (req,res)=>{
    //包含映射到命名路由“parameters”的属性的对象。例如，如果您有路线/user/:name，则“name”属性可用作req.params.name。该对象默认为{}。
    await categoryService.changeCategory(req.params.id,req.body)
    res.success();
})

router.delete("/:id",async(req,res)=>{
    await categoryService.deleteCategory(req.params.id)
    res.success()
})

module.exports=router