const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const port = 3000


app.use(express.json());

app.get('/', (req, res) => {
    res.send("To do API is running");
});

app.use(express.json());

// database connection
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected to the database'))
.catch(err => console.error('database connection error:', err));


// adding a task endpoint :
app.post('/todos', async (req, res) => {
    try {
      const { task } = req.body;
  
      if (!task) {
        return res.status(400).json({ error: 'Task is required' });
      }
  
      const newTodo = new Todo({ task });
      await newTodo.save();
  
      res.status(201).json(newTodo);
    } 
    catch (err) {
      console.error(err);
    }
  });


// showing all the added tasks endpoint :

app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } 
    catch (err) {
      console.error(err);
    }
  });
  
  // changing tha task's status to Done endpoint :
  app.put('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(todo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  });
  

  // delete a task endpoint 
  app.delete('/todos/:id', async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'task deleted successfully' });

  });
  
  
app.listen(3000, () => {
        console.log('server is running on port 3000');
});
  
