const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Question = require('./Quizdb')

router.get('/makeQuiz',(req,res)=>{
    res.render('quiz/makeQuiz')
})

router.post('/makeQuiz',(req,res)=>{

  var obj = {
    quizName:req.body.name,
    time:req.body.time
  }
  console.log(obj);
  Question.create(obj,(err,items)=>{
    if(err){
      console.log(err);
    }else{
      res.render('quiz/createQuestions')
    }
  })
})

router.post('/quizQues',(req,res)=>{
  var obj = {
    question:req.body.question,
    opt1:req.body.op1,
    opt2:req.body.op2,
    opt3:req.body.op3,
    opt4:req.body.op4,
    corr:req.body.correct,
  }
  Question.findOneAndUpdate({quizName:'Operating System'},{$push:{questions:obj}},(err,items)=>{
    if(err){
      console.log(err);
    }else{
      res.render('quiz/createQuestions')
    }
  })
})

router.get('/all-quiz',(req,res)=>{
  Question.find((err,items)=>{
    if(!err){
      res.render('quiz/allQuiz',{items:items})
    }
  })

})

router.get('/demo',(req,res)=>{
  res.render('quiz/givequiz0')
})
router.post('/give-quiz',(req,res)=>{
  var obj= {
    name:req.body.name,
    rollno:req.body.rollno
  }
  res.render('quiz/giveQuiz')
})




module.exports = router
