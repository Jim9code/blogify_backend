const express = require('express')
const router = express.Router()
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


router.get('/auth/google',passport.authenticate('google',{scope:['email', 'profile']}));
router.get('/google/callback',passport.authenticate('google',{  failureRedirect:'/'}),
(req, res) => {
    // Redirect to Svelte frontend
    res.redirect('http://localhost:5173/'); // Adjust the redirect as needed
  });


// Protected routes
router.get('/logout',isLoggedIn,logout.logout);
router.get('/protected',isLoggedIn,login.login)
router.post('/addblog',isLoggedIn,upload.single('image'),postImage.postImage)
router.post('/delete/:imgId',isLoggedIn,deleteImg.deleteImg )
router.get('/profileinfo',isLoggedIn,profile_info.profile_info)
router.get('/bloghistory',isLoggedIn,blogHistory.blogHistory)
router.get('/blogs',blogs.blogs)
router.get('/:blogId',singleBlog.singleBlog)
router.get('/profile/:userId',isLoggedIn,singleProfile.singleProfile)
router.get('/otherhistory/:userHistoryId',otherHistory.otherHistory)



module.exports = router