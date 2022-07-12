import React from 'react';
import {Link} from 'react-router-dom';
import {AUTH_TOKEN, CURRENT_LOGGED_USER_ID, CURRENT_LOGGED_USER_NAME} from '../constants';

import("../styles/Header.css")

const Header = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const currentLoggerUserName = localStorage.getItem(CURRENT_LOGGED_USER_NAME);

    return (
        <div className="header">
            {currentLoggerUserName &&
                <span className="header-current-user">Current user : {currentLoggerUserName}</span>
            }
            {authToken &&
                <Link
                    to="/messenger"
                    className="link"
                >
                    Messenger
                </Link>}

            <div className="link">
                {authToken ? (
                    <Link
                        to="/"
                        className="link"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN);
                            localStorage.removeItem(CURRENT_LOGGED_USER_ID);
                            localStorage.removeItem(CURRENT_LOGGED_USER_NAME);
                        }}
                    >
                        Logout
                    </Link>
                ) : (
                    <Link
                        className="link"
                        to="/login"
                    >
                        Login/Sign up
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;