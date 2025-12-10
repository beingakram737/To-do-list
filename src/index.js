// index.js (Corrected Code)

// 1. Import React.
import React from 'react';

// 2. Import ReactDOM from the correct path 'react-dom/client'.
import ReactDOM from 'react-dom/client'; 

// 3. Import the main ToDoList component (which is named ToDoList in App.js).
import ToDoList from './App'; // Note: Changed 'App' to 'ToDoList' for clarity

// 4. Import the global CSS file
import './index.css'; 

// Get the root element from the HTML file (public/index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <ToDoList /> {/* Using ToDoList here */}
  </React.StrictMode>
);

// End of index.js