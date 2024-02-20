import actionTypes from './actionTypes';

export const addUserSuccess = () => ( {
    type: actionTypes.ADD_USER_SUCCESS
} )


export const addAdminSuccess = () => ( {
    type: actionTypes.ADD_ADMIN_SUCCESS
} )

export const userLoginSuccess = ( userInfo ) => ( {
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
} )

export const userLoginFail = () => ( {
    type: actionTypes.USER_LOGIN_FAIL
} )

export const processLogout = () => ( {
    type: actionTypes.PROCESS_LOGOUT
})


export const userLoginSuccess_U = ( userInfo ) => ( {
    type: actionTypes.USER_U_LOGIN_SUCCESS,
    userInfo: userInfo
} )

export const userLoginFail_U = () => ( {
    type: actionTypes.USER_U_LOGIN_FAIL
} )

export const processLogout_U = () => ( {
    type: actionTypes.PROCESS_LOGOUT_USER
} )