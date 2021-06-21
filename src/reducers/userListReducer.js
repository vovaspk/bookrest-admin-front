const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";

const defaultState = 
    [
    
]


export default function userListReducer(state = [], action) {
    console.log('users list in userListReducer');
    //here got action.payload only one object uesr {}
    console.log(action.payload);
    switch (action.type) {
        case SET_USERS:
            //state = action;
            return  [...action.payload]
                // users: [action.payload, ...defaultState.users]
        case DELETE_USER:
            return [...state.filter(user => user._id != action.payload)]
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
