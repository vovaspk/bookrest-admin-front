const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";

const defaultState = 
    [
    
]


export default function userListReducer(state = [], action) {
    console.log('users list in userListReducer');
    //make admins not shown, so admin cannot delete another admin

    console.log(action.payload);
    switch (action.type) {
        case SET_USERS:
            //state = action;
            return  [...action.payload]
                // users: [action.payload, ...defaultState.users]
        case DELETE_USER:
            console.log('DELETE_USERS: ');
            console.log(action.payload);
            return [...state.filter(user => user.id != action.payload)]
        default:
            return state
    }
}


export const setUsers = users => ({type: SET_USERS, payload: users});
export const deleteUserAction = (userId) => ({type: DELETE_USER, payload: userId})

//     {
    //     "id": 2,
    //     "created": "2021-05-03T12:32:31.649+00:00",
    //     "updated": "2021-05-03T12:33:21.906+00:00",
    //     "status": "VERIFIED",
    //     "username": "testUser",
    //     "firstName": "testFirstName",
    //     "lastName": null,
    //     "email": "testEmail",
    //     "roles": [
    //         {
    //             "id": 1,
    //             "name": "ROLE_USER"
    //         },
    //         {
    //             "id": 2,
    //             "name": "ROLE_ADMIN"
    //         }
    //     ],
    //     "verificationTimesAsked": 2
    // }
