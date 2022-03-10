import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AUTH_TOKEN, CURRENT_LOGGED_USER_ID} from '../constants';

import("../styles/Header.css")

const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <div className="header">
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