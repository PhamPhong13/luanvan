import db from '../models/index';

// create a new patient
let createmenber = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Thanhvien.create( {
                email: data.email,
                fullName: data.fullName,
                phone: data.phone,
                image: data.image,
                desc: data.desc,
                position: data.position,
                nhiemky: data.nhiemky,
                inunion: data.inunion,
            } );
            

            resolve( {
                errCode: 0,
                message: "Create a new menber successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getmenber = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Thanhvien.findAll();
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list menber successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list menber failed!"
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
let getmenberById = ( id, position ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Thanhvien.findOne( {
                where: {
                    nhiemky: id,
                    position: position
                },
                raw: true
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get menber successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get menber failed!"
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
let deletemenber = ( id ) =>
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
        let Patient = await db.Thanhvien.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'menber not found!'
            } );
        }

        await db.Thanhvien.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete menber succeed!'
        } );
    } )
}

// update 
let updatemenber = ( data ) =>
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
            let patient = await db.Thanhvien.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update menber succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'menber not found!'
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
    createmenber: createmenber,
    getmenber: getmenber,
    getmenberById: getmenberById,
    deletemenber: deletemenber,
    updatemenber: updatemenber,
}