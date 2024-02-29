import db from '../models/index';

// create 
let createform = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Form.create( {
                postId: data.postId,
                name: data.name,
                desc: data.desc,
            } );

            resolve( {
                errCode: 0,
                message: "Create a new Form successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}


let createuserform = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Comment.create( {
                postId: data.postId,
                name: data.name,
                desc: data.desc,
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

let createkeyform = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Keyform.create( {
                formId: data.formId,
                key: data.key,
                desc: data.desc,
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


let getformbyid = ( postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Form.findOne( {
                where: {
                    postId: postId,
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get Form successfully!",
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

// update 
let updateform = (data) =>
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
            let patient = await db.Form.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                patient.desc = data.desc,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update Form succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Form not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


// update 
let updatekeyform = (data) =>
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
            let patient = await db.Keyform.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.key = data.key,
                patient.desc = data.desc,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update Form succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Form not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getkeyform = (id) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Keyform.findAll({
                where: {formId: id}
            } );
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

let deletekeyform = ( id, postId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Keyform.findOne( {
            where: {
                id: id,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'history not found!'
            } );
        }

        await db.Keyform.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete history succeed!'
        } );
    } )
}
 
module.exports = {
    createform: createform,
    createuserform: createuserform,
    createkeyform: createkeyform,
    getformbyid: getformbyid,
    updateform: updateform,
    getkeyform: getkeyform,
    updatekeyform: updatekeyform,
    deletekeyform: deletekeyform
}