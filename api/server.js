const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongo } = require('./db/mongo')

const{List, Task} = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// CORS HEADERS MIDDLEWARE

app.use(function (req,res,next){
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});



app.get('/lists', (req,res) =>{
   List.find({}).then((lists) =>{
       res.send(lists);
   });


});

app.post('/lists', (req,res)=>{

   let title = req.body.title;

   let newlist = new List({
       title
   });
   console.log(title);
   newlist.save().then((listDoc) =>{

    res.send(listDoc);
   });


});

app.patch('/lists/:id', (req,res)=>{

  List.findOneAndUpdate({_id: req.param.id},
    {
     $set: req.body   
    }).then(() =>{
        res.sendStatus(200);
    });


});

app.delete('/lists/:id', (req,res) =>{

    List.findOneAndRemove({ _id: req.params.id})

.then((removedListDoc)=>{
    res.send(removedListDoc)
})
});

//For Tasks

app.get('/lists/:listId/tasks' , (req,res) =>{
    Task.find({
        
        _listId: req.params.listId
         
    }).then((tasks)=>{
         res.send(tasks);
    });
});

app.post('/lists/:listId/tasks', (req,res)=>{
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskdoc) =>{
           res.send(newTaskdoc);
    });
});

app.patch('lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    
     }).then(()=>{
        res.send(JSON.stringify({success: success}));
        //res.send({message: "Done"});
     }); 
});

app.delete('/lists/:listId/tasks/:taskId' , (req,res)=>{
    Task.findOneAndDelete({
        _id: req.paramas.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    });
});
  
//simple all data get karnay kay liyay

app.get('/lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId
    }).then((task)=>{
          res.send(task);
    })
})

app.listen(3000,  ()=>{
    console.log('chall raha hai 3000');
})