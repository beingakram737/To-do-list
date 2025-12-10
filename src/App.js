// App.js

// 1. Import React, useState, AND useEffect.
import React, { useState, useEffect } from 'react';

// 2. Define the main function component named ToDoList.
function ToDoList() {
    
    // 3. Setup the state for tasks, loading from Local Storage on initial render.
    // English: 'tasks' stores an array of objects: { text: string, isCompleted: boolean }.
    // English: We use a function inside useState to check Local Storage on initial load.
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks'); 
        // If data exists, parse it from JSON string to a JS object array. If not, start with an empty array.
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    // State for the new task input field.
    const [newTask, setNewTask] = useState('');
    
    // State variables for editing functionality:
    // English: 'isEditing' holds the index of the task currently being edited (or null if none).
    const [isEditing, setIsEditing] = useState(null); 
    // English: 'editText' temporarily holds the text that the user is typing during editing.
    const [editText, setEditText] = useState(''); 
    
    
    // 7. Hook to save tasks to Local Storage whenever the 'tasks' state changes.
    // English: The dependency array ([tasks]) ensures this effect runs ONLY when the tasks state is updated.
    useEffect(() => {
        const tasksJson = JSON.stringify(tasks); 
        localStorage.setItem('tasks', tasksJson);
    }, [tasks]); 


    // Function to handle changes in the new task input field.
    // English: This function captures the text the user is typing for a NEW task.
    function handleInputChange(event) {
        setNewTask(event.target.value); 
    }

    // 2. Function to add a new task to the list.
    // English: This function runs when the 'Add Task' button is clicked.
    function addTask() {
        if (newTask.trim() !== "") {
            // English: Create a new task object with isCompleted defaulted to false.
            const taskObject = { text: newTask, isCompleted: false };
            setTasks(t => [...t, taskObject]); 
            // Clear the input field.
            setNewTask("");
        }
    }

    // 3. Function to delete a task based on its index.
    // English: We use the array filter method to remove one item.
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // 4. Function to move a task up in the list.
    // English: Swaps the current item with the one above it.
    function moveTaskUp(index) {
        if (index > 0) { 
            const updatedTasks = [...tasks]; 
            // Array Destructuring: Swaps the elements at index and index - 1.
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // 5. Function to move a task down in the list.
    // English: Swaps the current item with the one below it.
    function moveTaskDown(index) {
        if (index < tasks.length - 1) { 
            const updatedTasks = [...tasks]; 
            // Array Destructuring: Swaps the elements at index and index + 1.
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    
    // 6. Function to toggle the completion status of a task.
    // English: This function runs when the task text is clicked.
    function toggleComplete(index) {
        const updatedTasks = [...tasks];
        // English: Invert the 'isCompleted' status (true becomes false, and vice-versa).
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTasks(updatedTasks);
    }
    
    // 8. Function to switch a task into Edit Mode.
    // English: This sets the state to indicate which task is being edited and loads the current text.
    function startEdit(index, currentText) {
        setIsEditing(index); // Set the index of the item being edited
        setEditText(currentText); // Load the task's current text
    }

    // 9. Function to handle changes in the editing input field.
    // English: Updates the temporary edit state as the user types.
    function handleEditChange(event) {
        setEditText(event.target.value);
    }

    // 10. Function to save the changes and exit Edit Mode.
    // English: Updates the main tasks array with the new edited text.
    function saveEdit(index) {
        if (editText.trim() !== "") {
            const updatedTasks = [...tasks];
            // Update the text property of the specific task
            updatedTasks[index].text = editText.trim();
            setTasks(updatedTasks);
            
            // Exit Edit Mode
            setIsEditing(null);
            setEditText('');
        }
    }


    // 4. Component returns the visual structure (JSX).
    return (
        <div className="to-do-list">
            <h1>My To-Do List</h1>
            
           {/* Input Section */}
            <div>
                <input 
                    type="text" 
                    placeholder="Enter task here..."
                    value={newTask} 
                    onChange={handleInputChange} // Link input to handler
                />
                <button 
                    className="add-button" 
                    onClick={addTask} // Link button to addTask function
                >
                    Add Task
                </button>
            </div>

           {/* List Display Section */}
            <ol>
                {/* Map through the tasks array to display each item. */}
                {tasks.map((task, index) => 
                    <li 
                        key={index}
                        // English: Dynamically add the 'completed' CSS class if the task is done.
                        className={task.isCompleted ? 'completed' : ''} 
                    >
                        
                        {/* Conditional Rendering: Check if the current task is the one being edited. */}
                        {isEditing === index ? (
                            // RENDER 1: If currently editing, show the input field and Save button
                            <>
                                <input 
                                    type="text"
                                    className="edit-input" // For CSS styling
                                    value={editText}
                                    onChange={handleEditChange} // Update temporary text state
                                    // English: Allow pressing Enter to save the edit.
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveEdit(index);
                                    }}
                                />
                                <button 
                                    className="save-button" // For CSS styling
                                    onClick={() => saveEdit(index)}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            // RENDER 2: If NOT editing, show the clickable text and Edit button
                            <>
                                {/* Task Text Span - Clickable to toggle completion status */}
                                <span 
                                    className="text"
                                    // English: When the text is clicked, call toggleComplete.
                                    onClick={() => toggleComplete(index)} 
                                >
                                    {task.text} {/* Display the text property of the object */}
                                </span>
                                
                                {/* NEW Edit Button */}
                                <button
                                    className="edit-button" // For CSS styling
                                    onClick={() => startEdit(index, task.text)} // Start edit mode
                                >
                                    Edit
                                </button>
                            </>
                        )}
                        
                        {/* Delete Button (Place outside the editing block to be always visible) */}
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)} 
                        >
                            Delete
                        </button>
                        
                        {/* Move Up Button */}
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            ⬆️
                        </button>
                        
                        {/* Move Down Button */}
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            ⬇️
                        </button>

                    </li>
                )}
            </ol>
        </div>
    );
}

// 6. Export the component.
export default ToDoList;