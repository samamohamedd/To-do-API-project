const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000


app.use(express.json());

app.get('/', (req, res) => {
    res.send("To do API is running");
});

app.use(express.json());

// ✅ اتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

