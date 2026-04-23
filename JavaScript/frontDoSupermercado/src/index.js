import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

 // pega o elemnto <div id="root"> do index.htlm
const root = ReactDOM.createRoot(document.getElementById('root'));

// renderiza o componente App dentro do root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);