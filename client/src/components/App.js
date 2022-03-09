import React from 'react';
import '../styles/App.css';
import Header from './Header';
import {Route, Routes} from 'react-router-dom';
import Messenger from "./Messenger/Messenger";

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
            </Routes>
        </div>
    );
};

export default App;