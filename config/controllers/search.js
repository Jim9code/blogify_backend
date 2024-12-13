const db =  require('./db')

exports.search = (req,res)=>{
    const searchWord = req.body.searchWord

    db.getConnection((err,connection)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:'db connection err'})
        }else{
            connection.query('select id,bloger_id,cloudinary_url,blog_title,bloger_username,created_at from blogs where lower(blog_title) like ? or lower(blog_content) like ? or lower(bloger_username) like ?',[`% ${searchWord} %`,`% ${searchWord} %`,`% ${searchWord} %`],(err,searchResult)=>{
               connection.release();
                if (err){
            console.log(err)
            res.status(500).json({error:"Search error"})
        }else{
            res.status(200).json(searchResult)
        }
    })
        }
    })
    
}