import db from '../models/index';

// create a new patient
let createrepcomment = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        // check input parameters

        try
        {
            await db.Repcomment.create( {
                commentId: data.commentId,
                userId: data.userId,
                repcomment: data.repcomment,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new repcomment successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getrepcomment = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Repcomment.findAll(
                {
                    include: [
                    { model: db.User },
                ],
                raw: true,
                nest: true
                }
             );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list repcomment successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list repcomment failed!"
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
let getrepcommentById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Repcomment.findAll( {
                where: {
                    commentId: id
                },
                
                    include: [
                    { model: db.User },
                ],
                raw: true,
                nest: true
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get repcomment successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get repcomment failed!"
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
let deleterepcomment = ( id ) =>
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
        let Patient = await db.Repcomment.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'repcomment not found!'
            } );
        }

        await db.Repcomment.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete repcomment succeed!'
        } );
    } )
}

// delete patient
let deleterepcommentbycomment = ( id ) =>
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
        let Patient = await db.Repcomment.findAll( {
            where: { commentId: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'repcomment not found!'
            } );
        }

        await db.Repcomment.destroy( {
            where: { commentId: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete repcomment succeed!'
        } );
    } )
}

// update 
let updaterepcomment = ( data ) =>
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
            let patient = await db.Repcomment.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.repcomment = data.repcomment;
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update repcomment succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'repcomment not found!'
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
    createrepcomment: createrepcomment,
    getrepcomment: getrepcomment,
    getrepcommentById: getrepcommentById,
    deleterepcomment: deleterepcomment,
    updaterepcomment: updaterepcomment,
    deleterepcommentbycomment: deleterepcommentbycomment
}