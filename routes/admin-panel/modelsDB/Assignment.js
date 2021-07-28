var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Amit:Jaggy@007@seminformer.pnvwk.mongodb.net/seminformer?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var imageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    img: {
        data: Buffer,
        contentType: String
    },
    submission:[
        {name: String,
        rollno: String,
        img: {data: Buffer, contentType: String},}
    ]
});



module.exports = new mongoose.model('Assignment', imageSchema);
