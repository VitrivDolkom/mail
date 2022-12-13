import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import state from './data/data.js';
import { createContext } from 'react';
import { ThemeProvider } from './context/Theme';
import { MessagesProvider } from './context/MessagesContext';

export const StateContext = createContext(null);

// <React.StrictMode>
// </React.StrictMode>

ReactDOM.createRoot(document.getElementById('root')).render(
    <MessagesProvider>
        <ThemeProvider>
            <StateContext.Provider value={{ state }} >
                <App />
            </StateContext.Provider>
        </ThemeProvider>
    </MessagesProvider>
)
