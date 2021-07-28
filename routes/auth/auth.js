//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://Amit:Jaggy@007@seminformer.pnvwk.mongodb.net/seminformer?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get("/login", function(req, res){
  res.render("auth/student-login");
});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      passport.authenticate("local")(req, res, function(){
        res.redirect("/class");
      });
    }
  });

});

// app.get('/class',(req,res)=>{
//   res.render
// })

app.get("/register", function(req, res){
  res.render("auth/student-register");
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password,  function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/login");
      });
    }
  });

});

app.get("/secret", function(req, res){
  res.render("secrets", {usersWithSecrets: foundUsers});

});


app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});




module.exports = app
