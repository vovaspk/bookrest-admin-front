import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, verifyUser } from "../../actions/user";
import '../dashboard/dashboard.css';
import UserStatus from './UserStatus';

const Dashboard = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dashBoardUsers = useSelector(state => state.users);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getUsers);

        // if (typeof dashBoardUsers !== 'undefined' && dashBoardUsers.length > 0) {
        //     renderUsersTable();
        // }


        console.log("dashboard users from state: ");
        console.log(dashBoardUsers);
    }, [dashBoardUsers])

    function renderTableHeader() {
        console.log("dashboard users from render table header: ");
        console.log(dashBoardUsers);
        let header = ["id", "username", "email", "firstname", "lastname", "status", "created", "updated", "roles", "verificationTimesAsked",]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    function deleteUserElement(user_id) {
        //TODO make custom modal popup(css) delete user? instead of this confirm
        var answer = window.confirm("Delete user with id: " + user_id + "?");
        if (answer) {
            dispatch(deleteUser(user_id))
        }
        else {
        }
    }

    const hasAdminRole = (roles) => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "ROLE_ADMIN") {
                return true;
            }
        }
        return false;
    }


    function renderUsersTable() {
        dispatch(getUsers)
        console.log("renderUserTable: dashboard object in renderMethod Dashboard component:");
        console.log(dashBoardUsers);
        // console.log("printing type of dashBoardUsers.users: ");
        // console.log(typeof (dashBoardUsers.users));
        // console.log("dashBoardUsers.users values: ");
        // console.log(typeof (Object.values(dashBoardUsers.users)));

        return dashBoardUsers
        .sort(function(a, b) { return a.id > b.id ? 1 : -1})
        .map((user, index) => {
                const { created, email, firstName, id, lastName, roles, status, updated, username, verificationTimesAsked } = user //destructuring
                return (
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        {/* <td>{handleStatus(user)}</td> */}
                        <td><UserStatus user={user}/></td>
                        <td>{created}</td>
                        <td>{updated}</td>
                        <td>{roles.map(r => r.name.split("_").pop()) + ','.slice(0, -1)}</td>
                        <td>{verificationTimesAsked}</td>
                        <td><button className="btn btn-danger" disabled={hasAdminRole(roles)} onClick={() => deleteUserElement(id)}>Delete</button></td>
                    </tr>
                )
            })
    }

    return (
        <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <h1 className="text-center">Users Dashboard</h1>
            <div className="text-center" id="panel">
                <button type="button" className="btn-light btn btn-outline-primary" onClick={() => {
                    dispatch(getUsers());
                    // renderUsersTable();
                }}>load users</button>
            </div>
            <div></div>

            <table id="usersTable" className="table table-bordered" style={{ marginTop: '15px' }}>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderUsersTable()}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;