//权限的校验
//对role和有权限的url进行映射
let role_permission=[
    {
        role:0,//用户，拥有一定的权限
        permissions:[
            /.*\/category/,
            /.*\/product/,
            /.*\/order/,
        ]
    },
    {
        role:100,//管理员，拥有一切权限
        permissions:[
            /.*/
        ]
    }
];
module.exports=(req,res,next)=>{
    if(req.user){
        let letGo=false;
        role_permission.forEach(obj=>{
            //判断用户的role是否和系统设定的role相等
            if(obj.role===req.use.role){
                //遍历路径
                obj.permissions.forEach(item=>{
                    if(item.test(req.url)){//test方法检验一个字符串是否匹配某个模式
                        letGo=true
                    }
                })
            }
        });
        if(!letGo){
            throw Error("权限不足")
        }
    }
    next()
};