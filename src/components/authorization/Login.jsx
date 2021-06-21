
import React, { useState } from 'react';
import '../authorization/login.css'
import Input from "../../utils/input/Input";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        
        <div className='loginForm'>
            <main className='form-signin'>
                <div className="text-center">
                    {/* <img className="mb-4" src="public\bootstrap-logo.svg" alt="" width="72" height="57"></img> */}
                    <div className="h3 mb-3 fw-normal">Sign in</div>
                    <div className="form-floating">
                        <Input value={username} setValue={setUsername} type="text" placeholder="Enter username..." />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..." />
                        <label htmlFor="floatingInput">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" onClick={() => dispatch(login(username, password))}>Login</button>
                </div>

            </main>
        </div>

    );
};

export default Login;