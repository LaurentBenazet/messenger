import React from 'react';
import {Link} from 'react-router-dom';

import("../styles/Header.css")

const Header = () => {
    return (
        <div className="header">
            <Link
                to="/messenger"
                className="link"
            >
                Messenger
            </Link>

            <Link to="/" className="link">
                Login/Register
            </Link>
        </div>
    );
};

export default Header;