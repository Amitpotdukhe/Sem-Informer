const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Amit:Jaggy@007@seminformer.pnvwk.mongodb.net/seminformer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true});

const AuthSchema = new mongoose.Schema({
    name:String,
    rollno:Number,
    mobile:Number,
    address:String

})



module.exports = mongoose.model('Auth', AuthSchema)
