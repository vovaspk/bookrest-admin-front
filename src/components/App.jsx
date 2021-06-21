import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
// import './app.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../actions/user";
import Dashboard from "./dashboard/Dashboard";
// import Profile from "./profile/Profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
          // dispatch(getUsers)
    }, [])


    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth ?
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Redirect to='/login'/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Redirect to="/dashboard"/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;