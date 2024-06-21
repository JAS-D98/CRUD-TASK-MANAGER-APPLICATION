import React, { useState } from 'react'

export default function EditTaskTodo({task}) {
    const [description, setDescription]=useState(task.description);

    const updateDescription= async(e)=>{
        e.preventDefault();
        try {
           const body={ description };
           const response=await fetch(`http://localhost:5000/todos/${task.todo_id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body),
           });
          window.location="/";
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${task.todo_id}`} onClick={()=>setDescription(task.description)}>
    Edit
    </button>

    <div class="modal fade" id={`id${task.todo_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog"> 
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setDescription(task.description)}></button>
        </div>
        <div class="modal-body">
            <input type="text" className='form-control'  value={description} onChange={e=>setDescription(e.target.value)}/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onClick={e=>updateDescription(e)}>Edit</button>
            <button type="button" class="btn btn-danger" onClick={()=>setDescription(task.description)}>Close</button>
        </div>
        </div>
    </div>
    </div>
    </div>
  )
}
