import './styles/App.css';
import './styles/_zero.css';
import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import General from './pages/General/General';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import cursor from "./img/cursor.svg";
import Letter from './pages/Letter/Letter';
import Preloader from './atom/Preloader/Preloader';
import Messages from './pages/Messages/Messages';


function App() {


    useEffect(() => {
        document.body.style.cursor = `url(${cursor}), auto`;
    }, []);

    return (
        <div className="App">

            <BrowserRouter >
                <Navbar />
                <Sidebar />
                <div className="wrapper">
                    <div className="content">
                        <Suspense fallback={<section><Preloader /></section>}>
                            <Routes>
                                <Route path='/' element={<General />} />
                                <Route path='/in' element={<Messages path="in" />} />
                                <Route path='/imp' element={<Messages path="imp" />} />
                                <Route path='/out' element={<Messages path="out" />} />
                                <Route path='/draft' element={<Messages path="draft" />} />
                                <Route path='/arc' element={<Messages path="arc" />} />
                                <Route path='/spam' element={<Messages path="spam" />} />
                                <Route path='/trash' element={<Messages path="trash" />} />
                                <Route path='/letter' element={<Letter />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        </div >
    );
}

export default App
