const db = require('./db')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const upload = require('./multer')
const path = require('path')



exports.postImage =  async (req,res)=>{
    try {
      const token = req.user.id
      const {username , profile_picture} = req.user

      const {blogTitle,blogContent} = req.body
      const file = req.file

        const result = await cloudinary.uploader.upload(file.path,{
                folder: 'blogs',
               width: 500, // Resize width
                height: 500, // Resize height
                transformation: [
                  { quality: 'auto' } // Optionally use 'auto' for automatic quality adjustment based on the viewer's device and network speed
                ]
              });
                  
              
              
      // Save image data to MySQL database
    const sql = `
      INSERT INTO blogs (bloger_id, cloudinary_url, blog_title, blog_content, public_id, bloger_pic , bloger_username)
      VALUES (?, ?, ?, ?,?,?,?)
    `;

    const params = [token, result.secure_url, blogTitle, blogContent, result.public_id ,profile_picture ,username];
    db.getConnection((err,connection)=>{
      if(err){
        console.log(err)
        res.status(500).json({error:'db connection err'})
    }else{
      connection.query(sql, params, (err, results) => {
       connection.release()
        if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ error: 'Failed to save image data to the database' });
      }else{
        res.status(200).json({success:"Blog processing was successful!"})
      }
    });

    }
    })

    
        
    } catch (err) {
        console.log(err);
            res.status(500).json({ error: 'Failed to process image' });
    }
}