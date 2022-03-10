import React from 'react';
import '../styles/App.css';
import Header from './Header';
import {Route, Routes} from 'react-router-dom';
import Messenger from "./Messenger/Messenger";
import Login from "./Login";

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/messenger" element={<Messenger/>}/>
                {/*<Route*/}
                {/*    path="/"*/}
                {/*    element={<Register/>}*/}
                {/*/>*/}
                <Route path="/login" element={<Login/>} />
            </Routes>
        </div>
    );
};

export default App;