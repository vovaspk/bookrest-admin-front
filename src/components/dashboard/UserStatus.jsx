import React, { useState }from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { verifyUser } from "../../actions/user";
import '../dashboard/dashboard.css';

const UserStatus = (props) => {
    const dispatch = useDispatch();
    const [currentStatus, setCurrentStatus] = useState("")

    useEffect(() => {
        setCurrentStatus(props.user.status);
        
    })

    return (
        <div>

            <button type='button' className={currentStatus === 'ACTIVE' ? 'greenStatusButton' : 'blueStatusButton'}
                onMouseOver={(e) => mouseOverButtonColor(e, currentStatus)}
                onMouseLeave={(e) => mouseLeaveButtonColor(e, currentStatus)}
                onClick={(e) => handleStatusClick(props.user, e)}>
                <strong>{currentStatus}</strong>
            </button>

        </div>
    );

    function buttonColor(e, status) {
        if (status === 'ACTIVE') {

        }
    }

    function mouseOverButtonColor(e, status) {
        if (status === 'ACTIVE') {
            e.target.style.transition = '0.5s';
            e.target.style.backgroundColor = '#e1edff';
            e.target.style.color = '#607ac4';
            e.target.textContent = 'VERIFY';
        } else {
            
        }
    }

    function mouseLeaveButtonColor(e, status) {
        if (status === 'VERIFIED') {
            
        } else {
            e.target.style.backgroundColor = '#cdf5dd';
            e.target.style.color = '#4fa77d';
            e.target.textContent = 'ACTIVE';
        }
    }

    function changeButtonBackGroundBlue(e, status) {

        e.target.style.transition = '0.5s';
        e.target.style.backgroundColor = '#e1edff';
        e.target.style.color = '#607ac4';
        e.target.textContent = 'VERIFY';
    }

    function changeButtonBackGroundGreen(e) {
        e.target.style.backgroundColor = '#cdf5dd';
        e.target.style.color = '#4fa77d';
        e.target.textContent = 'ACTIVE';
    }

    function handleStatusClick(user, e) {
        console.log('status click userId: ');
        console.log(user.id);
        var answer = window.confirm("Verify user with id: " + user.id + "?");
        if (answer) {
            dispatch(verifyUser(user.id))
            e.target.style.backgroundColor = '#e1edff';
            e.target.style.color = '#607ac4';
            e.target.textContent = 'VERIFIED';


            //dispatch(verifyUser(userId))

            //change how button appears



            // console.log('response from dispatch');
            // console.log(tempResp);
        }
        else {
        }
    }

}

export default UserStatus;