import db from '../models/index';

// create a new patient
let createnhiemky = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        // check input parameters
        if ( !data.name )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }

        try
        {
            await db.Nhiemky.create( {
                name: data.name,
            } );
            

            resolve( {
                errCode: 0,
                message: "Create a new nhiemky successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getnhiemky = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Nhiemky.findAll();
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list nhiemky successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list nhiemky failed!"
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
let getnhiemkyById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Nhiemky.findOne( {
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
                    message: "get nhiemky successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get nhiemky failed!"
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
let deletenhiemky = ( id ) =>
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
        let Patient = await db.Nhiemky.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'nhiemky not found!'
            } );
        }

        await db.Nhiemky.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete nhiemky succeed!'
        } );
    } )
}

// update 
let updatenhiemky = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.id )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let patient = await db.Nhiemky.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update nhiemky succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'nhiemky not found!'
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
    createnhiemky: createnhiemky,
    getnhiemky: getnhiemky,
    getnhiemkyById: getnhiemkyById,
    deletenhiemky: deletenhiemky,
    updatenhiemky: updatenhiemky,
}