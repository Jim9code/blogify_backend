const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const upload = require('../controllers/multer')
const postImage = require('../controllers/postImage')
const deleteImg = require('../controllers/deleteImg')
const isLoggedIn = require('./logintStatus')
const passport = require('passport');
const logout = require('../controllers/logout')
const login = require('../controllers/login')
const profile_info = require('../controllers/profile_apis')
const blogHistory = require('../controllers/profile_apis')
const blogs = require('../controllers/blogs_apis')
const singleBlog = require('../controllers/blogs_apis')
const singleProfile = require('../controllers/profile_apis')
const otherHistory = require('../controllers/profile_apis')
const search = require('../controllers/search')
const edit = require('../controllers/edit')
const updateEdit = require('../controllers/edit')
const comments = require('../controllers/interaction_apis')
const getcomments = require('../controllers/interaction_apis')
const { likeController, viewController } = require('../controllers/blogController')


router.get('/auth/google',passport.authenticate('google',{scope:['email', 'profile']}));
router.get('/google/callback',passport.authenticate('google',{  failureRedirect:'/'}),
(req, res) => {
    // Redirect to Svelte frontend
    res.redirect(process.env.FRONTEND_URL); // Adjust the redirect as needed
  });


// Protected routes
router.get('/logout',isLoggedIn,logout.logout);
router.get('/protected',isLoggedIn,login.login)
router.post('/addblog',isLoggedIn,upload.single('image'),postImage.postImage)
router.post('/delete/:blogId',isLoggedIn,deleteImg.deleteImg )
router.get('/profileinfo',isLoggedIn,profile_info.profile_info)
router.get('/bloghistory',isLoggedIn,blogHistory.blogHistory)
router.get('/blogs',blogs.blogs)
router.get('/:blogId',singleBlog.singleBlog)
router.get('/profile/:userId',isLoggedIn,singleProfile.singleProfile)
router.post('/search',search.search)
router.get('/profile/blog/:editId',edit.edit)
router.post('/updateEdit',isLoggedIn,updateEdit.updateEdit)
router.post('/newcomment',isLoggedIn,comments.addcomments)
router.get('/getcomments/:blogcommentId',getcomments.getcomments)
router.post('/like/:blogId', likeController)
router.post('/view/:blogId', viewController)




module.exports = router