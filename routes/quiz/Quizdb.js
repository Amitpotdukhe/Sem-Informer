const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Amit:Jaggy@007@seminformer.pnvwk.mongodb.net/seminformer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true});

const QuestionSchema = new mongoose.Schema({
    quizName:String,
    time:Number,
    questions:[{
        question:String,
        opt1:String,
        opt2:String,
        opt3:String,
        opt4:String,
        corr:String
    }],

})

module.exports = mongoose.model('Question', QuestionSchema)
