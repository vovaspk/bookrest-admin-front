import axios from 'axios'
import { setUser } from "../reducers/userReducer";
import { API_URL } from "../config";
import { deleteUserAction, setUsers, verifyUserAction } from '../reducers/userListReducer';

const axiosConfigToken = {
    headers: {
        Authorization: `Bearer_${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export const registration = async (username, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            username,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username,
                password
            });
            if (hasAdminRole(response.data.roles)) {
                dispatch(setUser(response.data))
                localStorage.setItem('token', response.data.token)
                console.log('ADMIN ROLE')
            } else {
                alert("You have no priviledge to use this")
                //maybe add state for errors,and show invalid username, password validation on form, or just alert message
            }
            console.log(response.data);
        } catch (e) {
            alert(e.response.data.errorMessage);
        }
    }
}


export const getUsers = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer_${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
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

export const deleteUser = (userId) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer_${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            console.log('user.js deleteUser: ');
            dispatch(deleteUserAction(userId));
        } catch (e) {
            console.log(e)
            alert(e.response);
        }
    }
}

export const verifyUser = (userId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/verify/users/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer_${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            console.log('user.js verifyUser: ');
            console.log(response.data);

            dispatch(verifyUserAction(response.data));//pass user object to reducer
        } catch (e) {
            console.log(e)
            alert(e.response.errorMessage);
        }
    }
}

export const getTest = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/test`,
                {
                    headers: {
                        Authorization: `Bearer_${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
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

const hasAdminRole = (roles) => {
    for (let i = 0; i < roles.length; i++) {
        // console.log('role');
        // console.log(roles[i].name);
        if (roles[i].name === "ROLE_ADMIN") {
            // console.log('admin role?');
            // console.log(roles[i].name);
            return true;
        }

    }
    return false;

}
