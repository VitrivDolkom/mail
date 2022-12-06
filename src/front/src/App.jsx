import { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/_zero.css';
import Sidebar from './components/Sidebar/Sidebar';
import General from './pages/General/General';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Incoming from './pages/Incoming/Incoming';
import Important from './pages/Important/Important';
import Outcoming from './pages/Outcoming/Outcoming';
import Drafts from './pages/Drafts/Drafts';
import Archive from './pages/Archive/Archive';
import Spam from './pages/Spam/Spam';
import Trash from './pages/Trash/Trash';
import cursor from "./img/cursor.svg";
import Letter from './pages/Letter/Letter';

function App() {

    useEffect(() => {
        document.body.style.cursor = `url(${cursor}), auto`;

    }, []);

    return (
        <div className="App">
            <BrowserRouter >
                <Navbar />
                <Sidebar />
                <div className="content">
                    <Routes >
                        <Route path='/' element={<General />} />
                        <Route path='/in' element={<Incoming />} />
                        <Route path='/imp' element={<Important />} />
                        <Route path='/out' element={<Outcoming />} />
                        <Route path='/draft' element={<Drafts />} />
                        <Route path='/arc' element={<Archive />} />
                        <Route path='/spam' element={<Spam />} />
                        <Route path='/trash' element={<Trash />} />
                        <Route path='/letter' element={<Letter />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div >
    );
}

export default App
