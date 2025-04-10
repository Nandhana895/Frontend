import React, { useState,useEffect } from 'react';
import './Todolisit.css';

function Todolisit() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState(""); 
  const [editTask, setEditTask] = useState(null);
  const [editValue, setEditValue] = useState("");


 // Fetch all tasks
  function getAll() {

  fetch("http://localhost:3003/getall")
    .then((res) => res.json())
    .then((response) => {
      if (response && Array.isArray(response.result)) {
        setData(response.result);
      } else {
        console.error("Invalid response format:", response);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

useEffect(() => {
  getAll(); // Fetch tasks on component mount
}, []);



// Add a new task
function addTask(e) {
  e.preventDefault();
  if (!task.trim()) return;

  fetch("http://localhost:3003/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: task }),
  })
    .then((res) => res.json())
    .then(() => {
      setTask("");
      getAll(); // Refresh the list
    })
    .catch((error) => console.error("Error adding task:", error));
}


// Delete a task
function deleteTask(title) {
  fetch("http://localhost:3003/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title:title }), // Send task ID
  })
    .then((res) => res.json())
    .then(() => {
      getAll(); // Refresh the list
    })
    .catch((error) => console.error("Error deleting task:", error));
}


 // Start editing a task
 function startEditing(task) {
  setEditTask(task._id);
  setEditValue(task.title);
}

// Update a task
function updateTask(e) {
  e.preventDefault();
  if (!editValue.trim()) return;

  fetch("http://localhost:3003/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: editTask, updatevalue: editValue }),
  })
    .then((res) => res.json())
    .then(() => {
      setEditTask(null);
      setEditValue("");
      getAll(); // Refresh the list
    })
    .catch((error) => console.error("Error updating task:", error));
}

return (
  <div className="todo-container">
    <h1>My To‑Do List</h1>
    <form className="todo-form" onSubmit={editTask ? updateTask : addTask}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task…"
        value={editTask ? editValue : task}
        onChange={(e) => (editTask ? setEditValue(e.target.value) : setTask(e.target.value))}
        required
      />
      <button type="submit">{editTask ? "Update" : "Add"}</button>
      {!editTask && <button type="button" onClick={getAll}>Get All</button>}
    </form>

    <ul className="todo-list">
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item._id}>
              {editTask === item._id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span>{item.title}</span>
              )}
              <span> - {item.created ? new Date(item.created).toLocaleString() : "No Date"}</span>
              {editTask === item._id ? (
                <button onClick={updateTask}>Save</button>
              ) : (
                <>
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => deleteTask(item.title)} className="delete-btn">✕</button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>
            <span>No tasks yet</span>
          </li>
        )}
      </ul>
    </div>

);
}

export default Todolisit;