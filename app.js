var express=require('express'),
    mongoose=require('mongoose'),
    passport=require('passport'),
    bodyParser=require('body-parser'),
    User=require("./models/user"),
    LocalStrategy=require('passport-local'),
    passportlocalMongoose=require('passport-local-mongoose')
mongoose.connect("mongodb://localhost:27017/authapp",{useNewUrlParser:true,useUnifiedTopology:true});


var app=express();
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Pen is mightier than the Sword",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

// Used for reading the session and taking the data from a session to encode and decode it.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//================Routes================
app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/secret",isLoggedIn,(req,res)=>{
    res.render("secret");
});

//=============Auth Routes==============
//Show sign up form
app.get("/register",function(req,res){
    res.render("register");
});
//Handling UserSign up
app.post("/register",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});
//Login Routes
//render Login Form
app.get("/login",(req,res)=>{
    res.render("login");
});
//login Logic
//Using middleWare// its used so as to run some code that runs before our final route callback as in isLoggedIn() 
//Middleware isLoggedIn has been used to stop any random unauthorized user from accessing the /secret page.
app.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),    function(req,res){
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(2000,()=>{
    console.log('Server is on');
});
