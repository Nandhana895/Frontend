import React from 'react'
import './Todolisit.css'
function Todolisit() {
  return (
   <div>
    <div class="todo-container">
    <h1>My To‑Do List</h1>

    <form class="todo-form">
      <input type="text" class="todo-input" placeholder="Add a new task…" required />
      <button type="submit">Add</button>
    </form>

    <ul class="todo-list">
      <li>
        <span>Sample Task</span>
        <button class="delete-btn">✕</button>
      </li>
    </ul>
  </div>
  </div>

  )
}

export default Todolisit