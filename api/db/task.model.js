const mongo = require('mongoose');

var TaskSchema = new mongo.Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId:{
     type: mongo.Types.ObjectId,
     required: true
    },
    completed: {
     type:Boolean,
     default: false
    }
})

var Task = mongo.model('Tasks', TaskSchema);

module.exports = { Task }