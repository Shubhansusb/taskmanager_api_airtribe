const express = require('express');
const PORT = 3000;

const app = express();
const tasks = require('./taskdata');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const validator = require('./helper');
const path = require('path');

app.get('/', (req, res) => {
    return res.status(200).send('this is a task manager RESTful api');
});


app.get('/tasks', (req, res) => {
    return res.status(200).send(tasks);
});



app.get('/tasks/:idPassedBYUser', (req, res) => {
    const idPassed = parseInt(req.params.idPassedBYUser);
    
    if(isNaN(idPassed)){
        return res.status(400).send('Invalid ID provided');
     }

    let filteredTaskById = tasks.filter(val => val.id === idPassed);
    if (filteredTaskById.length == 0) {
        //no task exists with the given id
        return res.status(404).send('task associated with the passed id does not exist');
    } else {
        return res.status(200).send(filteredTaskById[0]);
    }

});




app.post('/tasks', (req, res) => {

    let taskDetailsbyUser = req.body;

    if (validator.validate(taskDetailsbyUser).status == true) {
        let newTask = {
            id: tasks.length + 1,
            title: taskDetailsbyUser.title,
            description: taskDetailsbyUser.description,
            completed: taskDetailsbyUser.completed
        }
        tasks.push(newTask);
        return res.status(200).send(validator.validate(taskDetailsbyUser).Comment)
    } else {
        return res.status(400).send(validator.validate(taskDetailsbyUser).Comment);
    }
});


app.put('/tasks/:id', (req, res) => {
    let idPassed= req.params.id;
    if(isNaN(idPassed)){
        return res.status(400).send('Invalid ID provided');
     }

    let updatedDetailsOfTheTask= req.body;

    let index=tasks.findIndex(i=>i.id == idPassed);
    if(index !==-1){
    if(validator.validate(updatedDetailsOfTheTask).result==true){
        tasks[index].title=updatedDetailsOfTheTask.title;
        tasks[index].description=updatedDetailsOfTheTask.description;
        tasks[index].completed=updatedDetailsOfTheTask.completed;

       return res.status(200).send('task updated successfully');

    }else{
        //please emter all the details.
        return res.status(400).send('please enter all the details');

    }

    }else{
        //no task exists with the given id 
       return  res.status(404).send('no task exists with the entered id');
    }

});


app.delete('/tasks/:id', (req,res)=>{
    let idPassed= parseInt(req.params.id);
    if(isNaN(idPassed)){
       return res.status(400).send('Invalid ID provided');
    }

    let index =tasks.findIndex((i=>i.id===idPassed));
    if(index!=-1){
        //index foud and delete now
        tasks.splice(index,1);
        return res.status(200).send('task deleted successfully');
    }else{
        //index not found hence wrong id passed
        return res.status(400).send('Invalid ID format. Please provide a valid number.')
    } 
});



app.listen(PORT, () => {
    console.log('server is up and running on port 3000')
}
);