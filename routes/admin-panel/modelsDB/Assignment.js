var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Sem-Informer", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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