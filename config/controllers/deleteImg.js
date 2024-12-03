const cloudinary =  require('cloudinary').v2
const db = require('./db')

exports.deleteImg = (req,res)=>{
    const blogId = req.params.blogId
        db.query('select public_id from blogs where id = ?',[blogId],async (err,imgPublic_id)=>{
            try {
                if(err){
                    console.log(err)
                    res.status(500).json({error:"delete failed"})
                  }else{
                    await cloudinary.uploader.destroy(imgPublic_id[0].public_id)
                    db.query('delete from blogs where id = ?',(blogId),(err)=>{
                      if(err){
                        console.log(err)
                      }else{
                        res.json({success:" Blog delete was successful"})
                      }
                    })
                  }
            } catch (err) {
                console.log(err)
                res.status(500).json({error:"delete failed"})
            }

        })
  }