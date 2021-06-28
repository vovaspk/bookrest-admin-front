const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";
const VERIFY_USER = "VERIFY_USER";

const defaultState =
    [

    ]


export default function userListReducer(state = [], action) {
    console.log('users list in userListReducer');

    console.log(action.payload);
    switch (action.type) {
        case SET_USERS:
            return [...action.payload]
        case DELETE_USER:
            console.log('DELETE_USERS: ');
            console.log(action.payload);
            return [...state.filter(user => user.id != action.payload)]
        case VERIFY_USER:
            console.log('VERIFY_USER: ');
            console.log(action.payload);

            const indexU = state.findIndex(user => user.id === action.payload.id)
            const updatedUser = action.payload;

            //return [...state.slice(0, indexU), updatedUser, ...state.slice(indexU + 1)] strange behaviour with one element


            //return [...state.filter(user => user.id != action.payload.id), action.payload] //doesnt update button after verification

            return [...state.map(user => {return user.id === action.payload.id ? action.payload : user} )]// verifies, but need to reload to see verified, it's just disabled button after verification
            
            // return [...state.filter(user => user.id != action.payload)]   THINK ABOUT HOW THIS SHOULD WORK
        default:
            return state
    }
}


export const setUsers = users => ({ type: SET_USERS, payload: users });
export const deleteUserAction = (userId) => ({ type: DELETE_USER, payload: userId });
export const verifyUserAction = (verifiedUser) => ({ type: VERIFY_USER, payload: verifiedUser });

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
