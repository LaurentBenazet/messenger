import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AUTH_TOKEN, CURRENT_LOGGED_USER_ID, CURRENT_LOGGED_USER_NAME} from '../constants';

import("../styles/Header.css")

const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const currentLoggerUserName = localStorage.getItem(CURRENT_LOGGED_USER_NAME);

    return (
        <div className="header">
            {currentLoggerUserName &&
                <span className="header-current-user">Logged in as {currentLoggerUserName}</span>
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
                    <div
                        className="link"
                        onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN);
                            localStorage.removeItem(CURRENT_LOGGED_USER_ID);
                            localStorage.removeItem(CURRENT_LOGGED_USER_NAME);
                            navigate(`/`);
                        }}
                    >
                        Logout
                    </div>
                ) : (
                    <Link
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