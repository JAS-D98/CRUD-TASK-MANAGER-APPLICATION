import React, { useEffect, useState } from 'react'
import EditTaskTodo from './EditTaskTodo';

export default function EditTodo() {
    const [todos, setTodos]=useState([]);

    const getTodos=async()=>{
        try {
            const response=await fetch("http://localhost:5000/todos");
            const jsonData=await response.json();
            setTodos(jsonData)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete= async(id)=>{
        try {
            const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo=>todo.todo_id !== id))
        
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getTodos();
    },[])
  return (
    <div>
     <table>
    <thead>
        <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {todos.map((task, i) => (
            <tr key={task.todo_id}>
                <td>{task.description}</td>
                <td><button><EditTaskTodo task={task}/></button></td>
                <td><button onClick={() => handleDelete(task.todo_id)}>Delete</button></td>
            </tr>
        ))}
    </tbody>
    </table>

    </div>
  )
}
