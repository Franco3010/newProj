const router = require('express').Router();
// const { query } = require('express');
const res = require('express/lib/response');
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
const Product = require('/ProjTN/src/model/product.js');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

 /**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: 'home' }),(req,res)=>{
     console.log('route user_id la:'+req.user)
 });

 router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});
router.get('/login', (req, res, next) => {

console.log(req.user)
    res.render('login');
    
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/home', function (req, res, next) {
    var storeCollect = []
    const storeDoc = []
    mongo.connect(url,(err,db)=>{
    let dbo = db.db('shopping')
    let cusor  = dbo.collection('products').find()
    cusor.forEach(function(doc,err){
        storeDoc.push(doc)

    },function(){
        for(let i = 0;i<storeDoc.length;i +=3){
            storeCollect.push(storeDoc.slice(i,i+3))
        }
        db.close()
        res.render('home',{products:storeCollect})
    })
    })
  
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {


    res.render('register');
    
});



/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/register');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});
router.get('/test',(req,res)=>{
    const x =[]
    Product.find((err,docs)=>{
   x.push(docs)
    })
    res.json(x)
})
module.exports = router;