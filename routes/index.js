var express = require('express');
var router = express.Router();

const solar = require('../models/solarmodel')
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(solar.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user  });
});
router.get('/about', function(req, res, next) {
  res.render('about' , { user : req.user  });
});
router.get('/service', function(req, res, next) {
  res.render('service' , { user : req.user  });
});
router.get('/login', function(req, res, next) {
  res.render('login' , { user : req.user  });
});
router.get('/register', function(req, res, next) {
  res.render('register' , { user : req.user  });
});

router.post('/register' , async function ( req , res , next ) { 
    try {
      // const newuser =new solar(req.body) ; 
      // await newuser.save() ;
      const {name , username , email , password } = req.body ; 
      solar.register({ name  , username ,  email }  , password)
      res.redirect('/login') ; 
    } catch (error) {
      res.send(error) ; 
    }
})

router.get('/profile' , isLoggedIn ,  function(req ,res , next ) { 
  res.render('profile' , { user : req.user  })
}) 


router.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
  }),
  function (req, res, next) {}
);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/login");
  }
}

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(() => {
      res.redirect("/login");
  });
});

module.exports = router;
