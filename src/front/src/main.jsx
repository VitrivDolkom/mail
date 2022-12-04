import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import state from './data/data.js';
import { createContext } from 'react';
import { ThemeProvider } from './context/Theme';

export const StateContext = createContext(null);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <StateContext.Provider value={{ state }} >
                <App />
            </StateContext.Provider>
        </ThemeProvider>
    </React.StrictMode>
)
