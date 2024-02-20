import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    isLoggedInUser: false,
    userInfo: null,
    users: null,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        
        
        case actionTypes.USER_U_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedInUser: true,
                users: action.userInfo
            }
        case actionTypes.USER_U_LOGIN_FAIL:
            return {
                ...state,
                isLoggedInUser: false,
                users: null
            }
        case actionTypes.PROCESS_LOGOUT_USER:
            return {
                ...state,
                isLoggedInUser: false,
                users: null
            }
        default:
            return state;
    }
}

export default appReducer;