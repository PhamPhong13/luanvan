import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync( 10 );
// hash password
let hashUserPassword = ( password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync( password, salt );

            resolve( hashPassWord );
        } catch ( e )
        {
            reject( e );
        }

    } )
}

// check email address
let checkUserEmail = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Patient.findOne( {
                where: { email: userEmail }
            } )
            if ( user )
            {
                resolve( true )
            } else
            {
                resolve( false )
            }

        } catch ( e )
        {
            reject( e )
        }
    } )
}
let checkUserEmail1 = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Doctor.findOne( {
                where: { email: userEmail }
            } )
            if ( user )
            {
                resolve( true )
            } else
            {
                resolve( false )
            }

        } catch ( e )
        {
            reject( e )
        }
    } )
}
let checkUserEmail2 = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Admin.findOne( {
                where: { email: userEmail }
            } )
            if ( user )
            {
                resolve( true )
            } else
            {
                resolve( false )
            }

        } catch ( e )
        {
            reject( e )
        }
    } )
}

// create a new patient
let createPatient = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        // check input parameters
        if ( !data.fullName || !data.email )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }

        try
        {
            let checkEmail = await checkUserEmail( data.email );
            if ( checkEmail === true )
            {
                resolve( {
                    errCode: 3,
                    message: "Your's Email is already exist in our system, plz try other email!"
                } )
            }
            let hashPassWord = await hashUserPassword( data.password );
            let res = db.Patient.create( {
                email: data.email,
                password: hashPassWord,
                fullName: data.fullName,
                address: data.address,
                birthday: data.birthday,
                phone: data.phone,
                gender: data.gender,
                roleId: "R3"
            } );

            resolve( {
                errCode: 0,
                message: "Create a new patient successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getPatient = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Patient.findAll( {
                attributes: {
                    exclude: [ 'password' ]
                },
                raw: true
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list patient successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list patient failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

//get patient by id
let getPatientById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Patient.findOne( {
                where: {
                    id: id
                },
                attributes: {
                    exclude: [ 'password' ]
                },
                raw: true
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list patient successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list patient failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

// delete patient
let deletePatient = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        if ( !id )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }
        let Patient = await db.Patient.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'Patient not found!'
            } );
        }

        await db.Patient.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete patient succeed!'
        } );
    } )
}

// update patient
let updatePatient = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.id || !data.email || !data.fullName )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let patient = await db.Patient.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.email = data.email;
                patient.fullName = data.fullName;
                patient.address = data.address;
                patient.birthday = data.birthday;
                patient.gender = data.gender;
                patient.phone = data.phone;
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update patient succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Patient not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let login = ( email, password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        console.log( email, password );
        try
        {
            let userData = {};
            let isExist = await checkUserEmail( email );
            if ( isExist )
            {
                //user already exist
                let user = await db.Patient.findOne( {
                    attributes: [ "id", 'email', 'roleId', 'fullName' ],
                    where: { email: email },
                    raw: true,

                } );
                if ( user )
                {
                    let check = await bcrypt.compare( password, user.password );
                    if ( check )
                    {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else
                    {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else
                {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else
            {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve( userData )
        } catch ( e )
        {
            reject( e );
        }
    } )
}

module.exports = {
    createPatient: createPatient,
    getPatient: getPatient,
    getPatientById: getPatientById,
    deletePatient: deletePatient,
    updatePatient: updatePatient,
    login: login,
}