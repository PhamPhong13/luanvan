import db from '../models/index';

// create a new patient
let createconnect = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Connect.create( {
                postId: data.postId,
                userId: data.userId,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new connect successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getconnect = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Connect.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list connect successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list connect failed!"
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
let getconnectById = ( postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Connect.findOne( {
                where: {
                    postId: postId,
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get connect successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get connect failed!"
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
let getAllconnectById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Connect.findAll( {
                where: {
                    catId: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get connect successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get connect failed!"
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
let deleteconnect = ( userId, postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Connect.findOne( {
            where: {
                userId: userId,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'connect not found!'
            } );
        }

        await db.Connect.destroy( {
            where: { userId: userId,
                },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete connect succeed!'
        } );
    } )
}

module.exports = {
    createconnect: createconnect,
    getconnectById: getconnectById,
    deleteconnect: deleteconnect,
    getconnect: getconnect
}