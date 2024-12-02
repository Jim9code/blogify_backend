const db = require('../controllers/db')

exports.blogs = (req,res)=>{
    db.query('select * from blogs',(err,allBlogs)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"error while getting blogs"})
        }else{
            res.status(200).json(allBlogs)
        }
    })
}

exports.singleBlog = (req,res)=>{
    const blogId = req.params.blogId

    db.query('select * from  blogs where id = ?',[blogId],(err,singleblog)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"error while getting singleblog"})
        }else{
            res.status(200).json(singleblog)
        }
    })
}