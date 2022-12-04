import { useState } from 'react';
import './styles/App.css';
import './styles/_zero.css';
import Sidebar from './components/Sidebar/Sidebar';
import General from './pages/General/General';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {

    return (
        <div className="App">
            <BrowserRouter base='/'>
                <Navbar />
                <Sidebar />
                <div className="content">
                    <Routes >
                        <Route path='/' element={<General />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App
