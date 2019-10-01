const mongo = require('mongoose');


var ListSchema = new mongo.Schema({

    title:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    }
})

var List = mongo.model('List', ListSchema);

module.exports = { List }