import db from '../models/index';

// create a new patient
let createlikepost = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Likepost.create( {
                postId: data.postId,
                userId: data.userId,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new likepost successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
/* // get all patient
let getlikepost = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Likepost.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list likepost successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list likepost failed!"
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
let getlikepostById = ( userId, postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Likepost.findOne( {
                where: {
                    userId: userId,
                    postId: postId,
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get likepost successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get likepost failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

let getlikepostBypostId = ( postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Likepost.findAll( {
                where: {
                    postId: postId,
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get likepost successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get likepost failed!"
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
let getAlllikepostById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Likepost.findAll( {
                where: {
                    catId: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get likepost successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get likepost failed!"
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
let deletelikepost = ( userId, postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Likepost.findOne( {
            where: {
                userId: userId,
                postId: postId,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'likepost not found!'
            } );
        }

        await db.Likepost.destroy( {
            where: { userId: userId,
                postId: postId, },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete likepost succeed!'
        } );
    } )
}

module.exports = {
    createlikepost: createlikepost,
    getlikepostById: getlikepostById,
    deletelikepost: deletelikepost,
    getlikepostBypostId: getlikepostBypostId
}