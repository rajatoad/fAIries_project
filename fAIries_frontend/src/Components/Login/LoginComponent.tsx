import axios from 'axios';
import React from 'react'
import { UserContext } from '../../Context/UserContext';

function LoginComponent() {

    const userContext = React.useContext(UserContext);
    const setUserData = userContext?.setUserData;

    let [loginInfo, setLoginInfo] = React.useState({
        username: '',
        password: ''
    });

    function handleLogin() {
        let url = `http://localhost:3000/users/login`;
        axios.post(url, loginInfo).then((response) => {
            console.log('Login successful:', response.data);
            if (setUserData) {
                setUserData(response.data);
            }
            // Handle successful login (e.g., redirect, store token, etc.)
        }).catch((error) => {
            console.error('Error logging in:', error);
            // Handle login error (e.g., show error message)

        })
    }
  return (
    <>
        <h1>Login</h1>
        <input 
            type="text"
            placeholder="Username"
            value={loginInfo.username}
            onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
        />
        <br />
        <input 
            type="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default LoginComponent