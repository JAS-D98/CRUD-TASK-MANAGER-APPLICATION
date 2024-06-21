const express=require('express');
const cors=require('cors');
const pool=require("./db")
const app=express();

const PORT=5000;

// middleware
app.use(cors());
app.use(express.json()); //req.body

// Routes

// create todo
app.post("/todos", async(req, res)=>{
    try {
        const { description }=req.body;
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.status(200).json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
})

//get all todos

app.get("/todos", async(req, res)=>{
    try {
        const allTodos=await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
       console.log(error.message); 
    }
})

// get a todo

app.get("/todos/:id", async(req, res)=>{
    try {
        const {id}=req.params;
        const todo=await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// update todo

app.put("/todos/:id", async(req, res)=>{
   try {
    const {id}=req.params;
    const {description}=req.body;
    const updateTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description, id]);
    res.json("updated successfully")
   } catch (error) {
    console.log(error.message);
   } 
});

// delete data

app.delete("/todos/:id", async(req, res)=>{
    try {
       const { id } =req.params;
       const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
       res.json("Todo was deleted") 
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});