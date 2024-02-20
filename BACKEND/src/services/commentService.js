import db from '../models/index';

// create a new patient
let createcomment = ( data ) =>
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
            await db.Comment.create( {
                postId: data.postId,
                userId: data.userId,
                comment: data.comment,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new comment successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getcomment = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Comment.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list comment successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list comment failed!"
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
let getcommentById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Comment.findOne( {
                where: {
                    id: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get comment successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get comment failed!"
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
let deletecomment = ( id ) =>
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
        let Patient = await db.Comment.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'comment not found!'
            } );
        }

        await db.Comment.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete comment succeed!'
        } );
    } )
}

// update 
let updatecomment = ( data ) =>
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
            let patient = await db.Comment.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.comment = data.comment;
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update comment succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'comment not found!'
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
    createcomment: createcomment,
    getcomment: getcomment,
    getcommentById: getcommentById,
    deletecomment: deletecomment,
    updatecomment: updatecomment,
}