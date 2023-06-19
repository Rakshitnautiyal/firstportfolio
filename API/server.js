import express from "express";
import mongoose from "mongoose";


import cors from "cors";

const app = express();

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://rakshitnautiyal18198:v1emzEvH4sWU4Fyx@cluster0.kpkaedu.mongodb.net/');
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
import Todo from "./Models/todo.js";
app.use(cors())

app.use(express.json());

app.get('/todos' , async(req, res) => {
  const todos = await Todo.find ();

  res.json(todos);
})
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares




app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save();

  res.json(todo); 
  // Rest of the code goes here

});


app.delete('/todo/delete/:id' , async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
  
})

app.get('/todo/complete/:id' , async (req , res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
})

app.listen(5000, () => {
  connect();
  console.log("Connected to backend.");
  console.log ("server started on this port")
});

