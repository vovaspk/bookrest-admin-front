import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../config";
import { setUsers } from '../reducers/userListReducer';

const axiosConfigToken = {
    headers: {
        Authorization:`Bearer_${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

export const registration = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            })
            console.log(response.data);
            dispatch(setUser(response.data))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // console.log(e.response)
            alert(e.response.data.errorMessage);
        }
    }
}


export const getUsers =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/admin/users`, {
                headers:{
                    Authorization:`Bearer_${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            console.log('user.js getUsers: ');
            console.log(response.data);
            dispatch(setUsers(response.data));
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteUser =  (userId) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
                headers:{
                    Authorization:`Bearer_${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            console.log('user.js deleteUser: ');
            console.log(response.data);
            dispatch(setUsers(response.data));
        } catch (e) {
            console.log(e)
        }
    }
}

export const getTest =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/auth/test`,
                {
                    headers:{
                        Authorization:`Bearer_${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    }
                }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}