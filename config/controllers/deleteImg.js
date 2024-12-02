const cloudinary =  require('cloudinary').v2
const db = require('./db')

exports.deleteImg = (req,res)=>{
    const imgId = req.params.imgId
        db.query('select public_id from images where id = ?',[imgId],async (err,imgPublic_id)=>{
            try {
                if(err){
                    console.log(err)
                    res.status(500).json({error:"delete failed"})
                  }else{
                    await cloudinary.uploader.destroy(imgPublic_id[0].public_id)
                    db.query('delete from images where id = ?',(imgId),(err)=>{
                      if(err){
                        console.log(err)
                      }else{
                        res.json({success:"delete was successful"})
                      }
                    })
                  }
            } catch (err) {
                console.log(err)
                res.status(500).json({error:"delete failed"})
            }

        })
  }