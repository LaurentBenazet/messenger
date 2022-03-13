import React, {useEffect, useState} from 'react';
import "../styles/Login.css"
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {AUTH_TOKEN, CURRENT_LOGGED_USER_ID, CURRENT_LOGGED_USER_NAME} from "../constants";

const SIGNUP_MUTATION = gql`
  mutation register($input: RegisterInput!) {
  register(input: $input) {
    id
    name
    email
    token
  }
}
`;

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
  login(input: $input) {
    id
    name
    email
    token
  }
}
`;

const Login = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const [loginMutation] = useMutation(LOGIN_MUTATION, {
        variables: {
            input: {
                email: formState.email,
                password: formState.password
            }
        },
        onCompleted: ({login}) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            localStorage.setItem(CURRENT_LOGGED_USER_ID, login.id);
            localStorage.setItem(CURRENT_LOGGED_USER_NAME, login.name);
            navigate('/messenger');
        }
    });

    useEffect(() => {
        const submitLogin = (e) => {
            if (e.key === 'Enter') {
                formState.login ? loginMutation() : signupMutation();
            }
        }

        document.addEventListener('keydown', submitLogin);
        return () => {
            document.removeEventListener('keydown', submitLogin);
        }
    })


    const [signupMutation] = useMutation(SIGNUP_MUTATION, {
        variables: {
            input: {
                name: formState.name,
                email: formState.email,
                password: formState.password
            }
        },
        onCompleted: ({register}) => {
            localStorage.setItem(AUTH_TOKEN, register.token);
            localStorage.setItem(CURRENT_LOGGED_USER_ID, register.id);
            localStorage.setItem(CURRENT_LOGGED_USER_NAME, register.name);
            navigate('/messenger');
        }
    });

    return (
        <div className="login">
            <h4>
                {formState.login ? 'Login' : 'Sign up'}
            </h4>
            <div className="login-container">
                {!formState.login && (
                    <input
                        className="login-input"
                        value={formState.name}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                name: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    className="login-input"
                    value={formState.email}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            email: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    className="login-input"
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="login-buttons">
                <button
                    className="login-button"
                    onClick={formState.login ? loginMutation : signupMutation}
                >
                    {formState.login ? 'Login' : 'Sign up'}
                </button>
                <button
                    className="login-button"
                    onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                    }
                >
                    {formState.login
                        ? 'I don\'t have an account'
                        : 'I already have an account'}
                </button>
            </div>
        </div>
    );
};

export default Login;