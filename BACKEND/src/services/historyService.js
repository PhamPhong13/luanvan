import db from '../models/index';

// create a new patient
let createhistory = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.history.create( {
                postId: data.postId,
                userId: data.userId,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new history successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
/* // get all patient
let gethistory = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.history.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list history successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list history failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}
 */
//get patient by id
let gethistoryById = ( postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.history.findOne( {
                where: {
                    postId: postId,
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get history successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get history failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

/* //get patient by id
let getAllhistoryById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.history.findAll( {
                where: {
                    catId: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get history successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get history failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
} */
// delete patient
let deletehistory = ( userId, postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.history.findOne( {
            where: {
                userId: userId,
                postId: postId,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'history not found!'
            } );
        }

        await db.history.destroy( {
            where: { userId: userId,
                postId: postId, },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete history succeed!'
        } );
    } )
}

module.exports = {
    createhistory: createhistory,
    gethistoryById: gethistoryById,
    deletehistory: deletehistory,
}