const multer = require("multer");
const path = require('path')


// multer config
const upload =  multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(new Error("File type is not surported"),false);
            return;
        }
        cb(null,true)
    }
})

module.exports = upload