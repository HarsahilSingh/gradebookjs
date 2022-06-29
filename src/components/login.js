import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
        } else {
            props.setIsLoggedIn(false);
        }
    }, [props.isLoggedIn]);

    const usernameHandler = (event) => {
        setUsername(event.target.value)
        localStorage.setItem("username", event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const login = () => {
        axios.post('https://gradebookjs.herokuapp.com/login/', {
            "username": username,
            "password": password
        }).then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userGroup", response.data.group)
            props.setIsLoggedIn(true)
            navigate('Home')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Please enter your login details</h1>
            <br></br>
            <div >
                <label htmlFor="username" className={'form-label'}>Username</label>
                <input id={'username'} onChange={usernameHandler} type={'text'} className={'form-control'}/>
            </div>
            <br></br>
            <div >
                <label htmlFor="password" className={'form-label'}>Password</label>
                <input id={'password'} onChange={passwordHandler} type={'password'} className={'form-control'}/>
            </div>
            <br></br>
            <button onClick={login} className={'btn btn-success'} type={"submit"}>Login</button>
        </div>
    );
}

export default Login;