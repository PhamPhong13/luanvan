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
                adminId: data.adminId,
                name: data.name,
                desc: data.desc,
                date: data.date,
                quatity: data.quatity,
                status: "open"
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
            await db.Userform.findOrCreate( {
                    where: { formId: data.formId,
                             adminId: data.adminId,
                    },
                defaults: {
                            formId: data.formId,
                             adminId: data.adminId,
                        }

                    } )

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


let getuserform = ( formId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Userform.findAll( {
                where: {
                 formId: formId,
                },
                include: [
                    {model: db.Admin}
                ],
                raw: true,
                nest: true
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

let createanswerquestion = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Answer.create( {
                keyformId: data.keyformId,
                userId: data.userId,
                answer: data.answer,
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


let getformbyid = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let patients = await db.Form.findOne({
                where: {
                    postId: postId,
                }
            });

            if (!patients) {
                resolve({
                    errCode: 1,
                    message: "No form found for the provided postId."
                });
                return;
            }
            let currentDate = new Date();
            let date = new Date(patients.date);
            if (date <= currentDate) {
                await updatestatusFrom(patients.id, "close");
                
            } 
            else {
                    await updatestatusFrom(patients.id, 'close');
                let keyForm = await db.Keyform.findOne({
                where: {
                    formId: patients.id
                }
            });

            if (keyForm) {
                let answerCount = await db.Answer.count({
                    where: {
                        kerformId: keyForm.id
                    }
                });

                if (+answerCount === +patients.quantity) {
                    await updatestatusFrom(patients.id, 'close');
                        
                }
                else {
                    await updatestatusFrom(patients.id, 'open');
                }
            }
            }

            
            

            resolve({
                errCode: 0,
                message: "Form retrieved successfully!",
                data: patients
            });
        } catch (err) {
            reject(err);
        }
    });
}

let updatestatusFrom = (id, status) => {
     return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            
            let patient = await db.Form.findOne( {
                where: { id: id },
                raw: false

            } )
            if ( patient )
            {
                patient.status = status,
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
                patient.adminId = data.adminId,
                patient.desc = data.desc,
                patient.date = data.date,
                patient.quantity = data.quantity,
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

let deletekeyform = ( id ) =>
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

let deleteform = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Form.findOne( {
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

        await db.Form.destroy( {
            where: { id: id },
        });
        
        await db.Keyform.destroy({
            where: { formId: id },
        })
        resolve( {
            errCode: 0,
            errMessage: 'Delete history succeed!'
        } );
    } )
}


let createanswerform = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            await db.Answer.create( {
                kerformId: data.key,
                userId: data.userId,
                answer: data.answer,
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

let getanswerform = ( id , userId) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Answer.findOne( {
                where: {
                    kerformId: id,
                    userId: userId,
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
let updateanswerform = (data) =>
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
            let patient = await db.Answer.findOne( {
                where: {
                    kerformId: data.id,
                    userId: data.userId,
                },
                raw: false

            } )
            if ( patient )
            {
                patient.answer = data.answer,
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
let updateformusersubmit = (data) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patient = await db.FormUserSubmit.findOne( {
                where: {
                    formId: data.formId,
                userId: data.userId},
                raw: false

            } )
            if ( patient )
            {
                patient.formId = data.formId,
                patient.userId = data.userId,
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

let getformusersubmit = (id, userId) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.FormUserSubmit.findAll({
                where: {
                    formId: id,
                    userId: userId
                },
                raw: true
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



let deleteanswerform = ( id , userId) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Answer.findOne( {
            where: {
                kerformId: id,
                userId: userId,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'history not found!'
            } );
        }

        await db.Answer.destroy( {
           where: {
                kerformId: id,
                userId: userId,
            },
        });
        
        resolve( {
            errCode: 0,
            errMessage: 'Delete history succeed!'
        } );
    } )
}



let getform = (page, adminId) => {
    return new Promise(async (resolve, reject) => {
        const limit = 5; // Số lượng bài viết mỗi trang
        let offset = 0;

        if (page === "undefined") page = 1;

        if (page !== "ALL") {
            offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        }

        try {
            let whereCondition = {};
            let totalPosts;

            if (adminId !== "1") {
                whereCondition = { adminId: adminId };
            }

            if (page === "ALL") {
                totalPosts = await db.Form.count();
            } else {
                totalPosts = await db.Form.count({ where: whereCondition });
            }

            const totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang

            let postsQuery = {
                order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo giảm dần
            };

            if (adminId !== "1") {
                postsQuery.where = whereCondition;
            }

            if (page !== "ALL") {
                postsQuery.offset = offset;
                postsQuery.limit = limit;
            }

            const patients = await db.Form.findAll(postsQuery);

            resolve({
                errCode: 0,
                message: "get list post successfully!",
                data: patients,
                total: totalPosts,
                totalPages: totalPages
            });
        } catch (err) {
            reject(err);
        }
    });
};


let getkeyformbyid = (id) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Keyform.findAll({
                where: { id: id },
                include: [{ model: db.Answer , as: "answerForm"}],
                raw: true,
                nest: true
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
 


let getformbykey = (id) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Form.findOne({
                where: { id: id },
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


let deleteuserform = ( formId , adminId) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let Patient = await db.Userform.findOne( {
            where: {
                formId: formId,
                adminId: adminId,
            },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'history not found!'
            } );
        }

        await db.Userform.destroy( {
           where: {
                formId: formId,
                adminId: adminId,
            },
        });
        
        resolve( {
            errCode: 0,
            errMessage: 'Delete history succeed!'
        } );
    } )
}



module.exports = {
    createform: createform,    createuserform: createuserform,
    createkeyform: createkeyform,    getformbyid: getformbyid,
    updateform: updateform,    getkeyform: getkeyform,
    updatekeyform: updatekeyform,    deletekeyform: deletekeyform,
    createanswerquestion: createanswerquestion,    deleteform: deleteform,
    createanswerform: createanswerform,    getanswerform: getanswerform,
    updateanswerform: updateanswerform,    deleteanswerform: deleteanswerform,
    getformusersubmit: getformusersubmit, updateformusersubmit: updateformusersubmit,
    getform: getform, getkeyformbyid: getkeyformbyid, getformbykey: getformbykey,
    getuserform: getuserform, deleteuserform: deleteuserform , updatestatusFrom: updatestatusFrom
}