import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../actions/user";

const Dashboard = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dashBoardUsers = useSelector(state => state.users);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getUsers);


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
        //dispatch(deleteUser(user_id))
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

    function renderUsersTable() {
        dispatch(getUsers)
        console.log("printing dashboard object in renderMethod Dashboard component:");
        console.log(dashBoardUsers);
        // console.log("printing type of dashBoardUsers.users: ");
        // console.log(typeof (dashBoardUsers.users));
        // console.log("dashBoardUsers.users values: ");
        // console.log(typeof (Object.values(dashBoardUsers.users)));

        // console.log('testUsers: ');
        // console.log(testUsers);

        return dashBoardUsers
            .map((user, index) => {
                const { created, email, firstName, id, lastName, roles, status, updated, username, verificationTimesAsked } = user //destructuring
                return (
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{status}</td>
                        <td>{created}</td>
                        <td>{updated}</td>
                        <td>{roles.map(r => r.name.split("_").pop()) + ','.slice(0, -1)}</td>
                        <td>{verificationTimesAsked}</td>
                        <dt><button className="btn btn-danger" disabled={hasAdminRole(roles)} onClick={() => deleteUserElement(id)}>Delete</button></dt>
                    </tr>
                )
            })
    }

    return (
        <div>
            <h1 className="text-center">Users Dashboard</h1>
            <div className="text-center" id="panel">
                <button type="button" className="btn-light btn btn-outline-primary" onClick={() => {
                    dispatch(getUsers());
                    // renderUsersTable();
                }}>load users</button>
            </div>
            <div></div>

            <table id="usersTable" className="table table-bordered">
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderUsersTable()}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;