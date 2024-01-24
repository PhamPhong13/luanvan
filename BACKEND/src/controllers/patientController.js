import patientService from '../services/patientService';

// create a new patient
let createPatient = async ( req, res ) =>
{
    let patient = await patientService.createPatient( req.body );
    return res.status( 200 ).json( patient );
}

// get all patient
let getPatient = async ( req, res ) =>
{
    let patient = await patientService.getPatient();
    return res.status( 200 ).json( patient );
}

// get patient by id
let getPatientById = async ( req, res ) =>
{
    let patient = await patientService.getPatientById( req.body.id );
    return res.status( 200 ).json( patient );
}

let deletePatient = async ( req, res ) =>
{
    let patient = await patientService.deletePatient( req.body.id );
    return res.status( 200 ).json( patient );
}

let updatePatient = async ( req, res ) =>
{
    let patient = await patientService.updatePatient( req.body );
    return res.status( 200 ).json( patient );
}


let login = async ( req, res ) =>
{
    let email = req.body.email;
    let password = req.body.password;

    if ( !email || !password ) // nếu email or password = null
    {
        // return 1 string json object
        return res.status( 500 ).json( {
            errCode: 1,
            message: 'Missing inputs parameter!'
        } )
    }

    let userData = await patientService.login( email, password )
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status( 200 ).json( {
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    } )
}

module.exports = {
    createPatient: createPatient,
    getPatient: getPatient,
    getPatientById: getPatientById,
    deletePatient: deletePatient,
    updatePatient: updatePatient,
    login: login
}