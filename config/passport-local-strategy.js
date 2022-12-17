//importing passport
const passport =require('passport');

//we will also need to require passport local library & specifying strategy
const LocalStrategy =require('passport-local').Strategy;

//importing User
const User = require('../models/user');

passport.use(new LocalStrategy)({
    usernameField : 'email'
},
    function(email,password,done){
        //find the user & establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding the user --> passport");
                return done(err);
            }
            if(!user || user.password !=password){
                console.log('Invalid username / password');
                return done(null,false);
            }
            return done(null,user);
        })
    })

   // serializing the user to decide which key is to be kept in the Cookies
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

   //deserializing the user from the Cookie
   passport.deserializeUser(function(id,done){
    User.findById(function(err,user){
        if(err){
            console.log("Error in finding User --> Passport");
            return done(err);
        }
        return done(null,user);
    });
   });

   module.exports = passport;