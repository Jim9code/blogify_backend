const { authenticate } = require("passport")

exports.login = (req,res)=>{

    let profile_pic = req.user.profile_picture
    res.status(200).json({authenticated:true ,profile_pic })
    
    
}