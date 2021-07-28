const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Sem-Informer", { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true});

const AuthSchema = new mongoose.Schema({
    name:String,
    rollno:Number,
    mobile:Number,
    address:String

})



module.exports = mongoose.model('Auth', AuthSchema)