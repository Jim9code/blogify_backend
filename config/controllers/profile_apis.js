const db = require('./db')

exports.profile_info = (req,res)=>{
    const username = req.user.username
    const profile_picture = req.user.profile_picture

    res.status(200).json({username,profile_picture})
}


exports.blogHistory = (req,res)=>{
    const token = req.user.id
    console.log(token)
    db.getConnection((err,connection)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'db connection err'})
        }else{
        connection.query('select id ,bloger_id,cloudinary_url,blog_title,created_at from blogs where bloger_id = ? order by id desc',[token],(err,history)=>{
           connection.release();
                if(err){
            console.log(err)
            res.status(500).json({error:"error getting history"})
        }else{
            res.status(200).json(history)
        }
    })
        }
    })
   
}

exports.singleProfile = (req,res)=>{
    const userId = req.params.userId

    db.getConnection((err,connection)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'db connection err'})
        }else{
            connection.query('select id ,username , profile_picture from  users where id = ?',[userId],(err,singleprofile)=>{
               connection.release();
                if(err){
            console.log(err)
            res.status(500).json({error:"error while getting singleprofile"})
        }else{
            res.status(200).json(singleprofile[0])
        }
    })
        }
    })
    
}

exports.otherHistory = (req,res)=>{
    const userHistoryId = req.params.userHistoryId
    
    db.getConnection((err,connection)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'db connection err'})
        }else{
            connection.query('select id ,bloger_id,cloudinary_url,blog_title,created_at from blogs where bloger_id = ? order by id desc',[userHistoryId],(err,history)=>{
              connection.release();
                if(err){
            console.log(err)
            res.status(500).json({error:"error getting history"})
        }else{
            res.status(200).json(history)
        }
    })
        }
    })
    
}