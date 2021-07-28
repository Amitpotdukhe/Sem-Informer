const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Assignment = require('./modelsDB/Assignment')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


//multer setup
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "routes/admin-panel/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });


router.get('/admin-panel',(req,res)=>{
    res.render("admin/admin-panel");
})
router.get('/admin-assign-assignment',(req,res)=>{
    res.render("admin/admin-panel-assignment")
})
router.post('/admin-assign-assignment', upload.single("image"), (req,res)=>{
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Assignment.create(obj,(err,items)=>{
        if(err){
            console.log("err in multer assignment",err);
            }else{
            items.save()
            res.redirect('/admin-assign-assignment')
            
        }
    })
})


module.exports = router