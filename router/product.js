let productService = require("../service/product");
let router = require("express").Router();

router.get("/",async(req,res)=>{
    let products = productService.showProduct(req.query.page);
    res.success(products);
});

router.post("/",async(req,res)=>{
    let pro = productService.addProduct(req.body);
    res.success(pro)
});

router.put("/:id",async(req,res)=>{
    productService.updateProduct(req.params.id,req.body)
    res.success()
})

router.delete("/:id",async(req,res)=>{
    productService.deleteProduct(req.params.id)
    res.success()
})
module.exports=router;