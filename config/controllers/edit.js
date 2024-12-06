const db = require('./db')

exports.edit = (req,res)=>{
    const editId = req.params.editId

    db.query('select blog_content from blogs where id = ?',[editId],(err,blogContent)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'error editing blog'})
        }else{
            res.status(200).json(blogContent[0])
        }
    })
}

exports.updateEdit = (req,res)=>{
    const {editId , blogContent} = req.body

    db.query('update blogs set blog_content = ? where id = ?',[blogContent,editId],(err)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'error updating blog'})
        }else{
            res.status(200).json({success:'update was successful'})
        }
    })
}