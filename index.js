const express=require('express');
const app = express();
const port =8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser=require('cookie-parser');
//used for session cookie & authenticate user
const session =require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//reading through the post requests
app.use(express.urlencoded());

//setting up the cookie parser 
app.use(cookieParser());

//accessing static files in assets
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract styles & scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongostore is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //Todo change the secret before deployment in Production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
      store : MongoStore.create(
        {
            mongoUrl : 'mongodb://localhost/codeial_Dev',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    )
}));

//we need to tell the app to use passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running : ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
})