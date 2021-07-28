const express = require("express")
const app = express();
const assgn = require('./routes/assgn')
const Admin = require('./routes/admin-panel/admin')
const Quiz = require('./routes/quiz/makeQuiz1')
//const givequiz = require('./routes/quiz/giveQuiz')
//const Video = require('./routes/video/server')
const Video = require('./routes/video/server')
const Auth = require('./routes/auth/auth')
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(Auth)
app.use(assgn)
app.use(Admin)
app.use(Quiz)
//app.use(givequiz)
app.use(Video)


app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(process.env.PORT || 4000, function() {
    console.log("server is on")
})
