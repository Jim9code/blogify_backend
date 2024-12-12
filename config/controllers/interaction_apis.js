const db = require('./db')

exports.addcomments = (req,res)=>{
    const {commentText , blogcommentId} = req.body
    console.log(commentText , blogcommentId)
    const commenterId = req.user.id 
    const commenterPic =  req.user.profile_picture
    const commenterUsername = req.user.username

    db.query('insert into comments (blog_id , commenter_id , commenter_username , commenter_pic , comments ) values(?,?,?,?,?) ',
        [blogcommentId , commenterId , commenterUsername , commenterPic , commentText],(err)=>{
            if(err){
                console.log(err)
                res.status(500).json({error:"error during comment!"})
            }else{
                res.status(200).json({success:"New comment added"})
            }
        }
    )
}

// get new comment
exports.getcomments = (req,res)=>{
    const blogcommentId = req.params.blogcommentId

    db.query('select * from comments where blog_id = ? order by id desc',[blogcommentId],(err,comments)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"error during getting comment!"})
        }else{
            res.status(200).json(comments)
        }
    })
}