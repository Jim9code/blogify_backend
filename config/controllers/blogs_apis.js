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

exports.blogs = async (req, res) => {
  try {
    // Get connection from pool
    const connection = await new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) reject(err);
        resolve(conn);
      });
    });

    try {
      // Modified query to include comment count
      const [rows] = await connection.promise().query(
        `SELECT 
          blogs.*,
          COALESCE(likes, 0) as likes,
          COALESCE(views, 0) as views,
          COUNT(comments.id) as comments_count
        FROM blogs 
        LEFT JOIN comments ON blogs.id = comments.blog_id
        GROUP BY blogs.id
        ORDER BY blogs.created_at DESC`
      );
      
      // Send response
      res.status(200).json(rows);
    } finally {
      // Always release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
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