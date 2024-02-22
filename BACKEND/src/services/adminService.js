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


let login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.Admin.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};


// create a new patient
let createAdmin = ( data ) =>
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
            await db.Admin.create( {
                email: data.email,
                password: hashPassWord,
                fullName: data.fullName,
                phone: data.phone,
                position: data.position,
                image: data.image,
                desc: data.desc,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new admin successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getAdmin = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Admin.findAll( {
                attributes: {
                    exclude: [ 'password' ]
                },
                include: [
                    { model: db.Allcode, as: 'positionAdmin', attributes: [ 'valueEn', 'valueVi' ] },
                ],
                raw: true,
                nest: true
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list admin successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list admin failed!"
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
let getAdminById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Admin.findOne( {
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
                    message: "get admin successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get admin failed!"
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
let deleteAdmin = ( id ) =>
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
        let Patient = await db.Admin.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'Admin not found!'
            } );
        }

        await db.Admin.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete Admin succeed!'
        } );
    } )
}

// update 
let updateAdmin = ( data ) =>
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
            let patient = await db.Admin.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.email = data.email;
                patient.fullName = data.fullName;
                patient.phone = data.phone;
                patient.position = data.position;
                patient.image = data.image,
                patient.desc = data.desc,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update admin succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'admin not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}



module.exports = {
    createAdmin: createAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    deleteAdmin: deleteAdmin,
    updateAdmin: updateAdmin,
    login: login
}