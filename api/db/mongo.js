const mongo = require('mongoose');

mongo.Promise = global.Promise;

mongo.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }).then(() =>{
console.log("Mogno connect :(");
}).catch((e)=>{
    console.log('masla hai');
    console.log(e);
});

mongo.set('UserCreateIndex', true);
mongo.set('useFindAndModify', false);


module.exports ={
    mongo
};