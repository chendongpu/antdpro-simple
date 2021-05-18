let  list=[
    { id:1,title:'TodoList列表',status:0},
    { id:2,title:'TodoList添加',status:1},
    { id:3,title:'TodoList编辑',status:2},
    { id:4,title:'TodoList修改状态',status:0},
    { id:5,title:'TodoList删除',status:0},
    { id:6,title:'TodoList搜索',status:0},
    { id:7,title:'TodoList总结',status:0},
];
export default {
    'GET /api/todolists':list,
    'POST /api/todo': (req,res)=>{
        const item={
            id:list.length+1,
            title:req.body.todo,
            status:0
        };
        list.unshift(item);
        res.send({
            code:0,
            message:'添加成功！'
        });
    }
};
