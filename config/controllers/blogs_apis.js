const db = require('../controllers/db')

// exports.blogs = (req,res)=>{
//     db.query('select id,bloger_id,cloudinary_url,blog_title,bloger_username,bloger_pic,created_at from blogs order by id desc',(err,allBlogs)=>{
//         if(err){
//             console.log(err)
//             res.status(500).json({error:"error while getting blogs"})
//         }else{
//             res.status(200).json(allBlogs)
//         }
//     })
// }

exports.blogs = (req, res) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection:', err);
        return res.status(500).json({ error: 'Database connection failed' });
      }
  
      // Perform the query
      connection.query(
        'SELECT id, bloger_id, cloudinary_url, blog_title, bloger_username, bloger_pic, created_at FROM blogs ORDER BY id DESC',
        (err, allBlogs) => {
          // Release the connection back to the pool
          connection.release();
  
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Error while getting blogs' });
          }
  
          res.status(200).json(allBlogs);
        }
      );
    });
  };
  





exports.singleBlog = (req,res)=>{
    const blogId = req.params.blogId

    db.getConnection((err,connection)=>{
        if(err){
            console.log(err)
            return res.status(500).json({ error: 'Database connection failed' });
        }else{
            connection.query('select * from  blogs where id = ?',[blogId],(err,singleblog)=>{
                connection.release()
                if(err){
                    console.log(err)
                    res.status(500).json({error:"error while getting singleblog"})
                }else{
                    res.status(200).json(singleblog)
                }
            })
        }
    })
    

    
}