
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import userListReducer from "./userListReducer";


const rootReducer = combineReducers({
    user: userReducer,
    users : userListReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))