import React, { useState } from 'react'

export default function InputTodo() {
    const [description, setDescription]=useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const body = {description};
            const response= await fetch("http://localhost:5000/todos", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
           window.location="/";
        }catch(error){
            console.log(error.message);
        }
    }
  return (
    <div>
        <h1>Pern Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter a description here' value={description} onChange={e=>setDescription(e.target.value)}/>
            <button>Add Description</button>
        </form>
    </div>
  )
}
