const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Assignment = require('./admin-panel/modelsDB/Assignment')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//multer setup
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "routes/admin-panel/uploads/assignment-sub")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

router.get('/class',(req,res)=>{
    
    res.render("class");
})
router.get('/view-assignment', (req,res)=>{
     Assignment.find((err,items)=>{

        res.render('view-assignment/view-assignment',{items:items})
    })
})

router.get('/viewSingleAssignment/:id',(req,res)=>{
    const id = req.params.id
    Assignment.findOne({_id:id},(err,items)=>{
        if(err){
            console.log(err);
        }else {
            res.render('view-assignment/singleAssig',{items:items})
        }

    })
})

router.get('/submitAssn/:postName',(req,res)=>{
    const id = req.params.postName
    res.render('view-assignment/submit-assignment',{id:id})
})
router.post('/submitAssn/:id', upload.single("ass-sub"), (req,res)=>{
    const id = req.params.id

    const obj ={
        name:req.body.name,
        rollno:req.body.rollno,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/admin-panel/uploads/assignment-sub/" + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Assignment.findOneAndUpdate({_id:id}, {$push:{submission:obj}},(err,items)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/view-assignment')
        }
    })
 })

router.get('/Ass-Sub',(req,res)=>{

    Assignment.find((err,items)=>{

        if(!err){
            res.render('admin/subAssView',{items:items})
        }
    })
})

router.get('/Ass-Sub/:id',(req,res)=>{
  const id = req.params.id
  Assignment.findOne({_id:id},(err,items)=>{
      res.render('admin/submissionsing',{items:items})
  })
})

module.exports = router
