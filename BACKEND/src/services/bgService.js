import db from '../models/index';

// create a new patient
let createbg = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Bg.create( {
                image: data.image,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new bg successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getbg = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Bg.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list bg successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list bg failed!"
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
let getbgById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Bg.findOne( {
                where: {
                    id: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get bg successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get bg failed!"
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
let deletebg = ( id ) =>
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
        let Patient = await db.Bg.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'bg not found!'
            } );
        }

        await db.Bg.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete bg succeed!'
        } );
    } )
}

// update 
let updatebg = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.id  )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let patient = await db.Bg.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.image = data.image,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update bg succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'bg not found!'
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
    createbg: createbg,
    getbg: getbg,
    getbgById: getbgById,
    deletebg: deletebg,
    updatebg: updatebg,
}