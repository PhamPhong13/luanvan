import db from '../models/index';

// create a new patient
let createreport = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {

        try
        {
            await db.Report.create( {
                type: data.type,
                userId: data.userId,
                userrportId: data.userrportId,
                postId: data.postId,
                content: data.content,
                comment: data.comment,
                image: data.image,
                status: data.status,
            } );
            

            resolve( {
                errCode: 0,
                message: "Create a new report successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getreport = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Report.findAll();
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list report successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list report failed!"
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
let getreportById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Report.findOne( {
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
                    message: "get report successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get report failed!"
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
let deletereport = ( id ) =>
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
        let Patient = await db.Report.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'report not found!'
            } );
        }

        await db.Report.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete report succeed!'
        } );
    } )
}

// update 
let updatereport = ( data ) =>
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
            let patient = await db.Report.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update report succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'report not found!'
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
    createreport: createreport,
    getreport: getreport,
    getreportById: getreportById,
    deletereport: deletereport,
    updatereport: updatereport,
}