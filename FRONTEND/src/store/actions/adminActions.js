import actionTypes from './actionTypes';
import
{
    getAllcodeService, /* createNewUserService, createNewAdmin,
    getAllAmin, getAllDoctor, getAllUser,
    deleteUserService, editUserService,



    getTopDoctorHomeService, saveDetailDoctor,
    getAllSpecialty, getAllClinic,


    deleteadmin, editAdminService, createNewDoctor, editDoctorService, deletedDoctor */
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// gender

export const fetchGenderStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_GENDER_START } );
            let res = await getAllcodeService( "GENDER" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchGenderSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchGenderFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchGenderFailed() );
            console.log( err );
        }
    }
}


export const fetchGenderSuccess = ( genderData ) => ( {
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
} )

export const fetchGenderFailed = () => ( {
    type: actionTypes.FETCH_GENDER_FAILED
} )


// position
export const fetchPositionStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_POSITION_START } );
            let res = await getAllcodeService( "POSITION" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchPositionSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchPositionFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchPositionFailed() );
            console.log( err );
        }
    }
}


export const fetchPositionSuccess = ( positionData ) => ( {
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
} )

export const fetchPositionFailed = () => ( {
    type: actionTypes.FETCH_POSITION_FAILED
} )


