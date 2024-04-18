import db from '../models/index';
import sendEmail from "./sendEmail"
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
let getreport = (id, status, page) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
       try
       {
            if (page === "undefined") page = 1;
            const limit = 5; // Số lượng bài viết mỗi trang
            const offset = (page - 1) * limit;
           let totalPosts = await db.Report.count(
               {
                    where: {
                    status: status
                },
                }
            ); // Đếm tổng số bài viết
            let totalPages = Math.ceil(totalPosts / limit);
            let patients = await db.Report.findAll({
                where: {
                    type: id,
                    status: status
                },
                 order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit,
                include: [
                    { model: db.User , as: "userreport" },
                    { model: db.User, as: "user" },
                    {
                        model: db.Post,
                        include: [{ model: db.Admin, attributes: ['email', "fullName"] }],
                        raw: true,
                        nest: true,
                    }
                ],
                raw: true,
                nest: true,
               
            });
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list report successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages
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
            let patients = await db.Report.findAll( {
                where: {
                    userrportId: id
                },
                include: [
                    { model: db.User , as: "userreport" },
                    { model: db.User, as: "user" },
                    {
                        model: db.Post,
                        include: [{ model: db.Admin, attributes: ['email', "fullName"] }],
                        raw: true,
                        nest: true,
                    }
                ],
                raw: true,
                nest: true,
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

            })
            
            if (patient.status === 'S1') {
                patient.status = 'S2',
                await patient.save();
            }

            // Đếm số lượng bản ghi có trạng thái 'S1' với id
                const countS1 = await db.Report.count({
                    where: {
                        userrportId: patient.userrportId,
                        status: 'S2'
                    }
                });
            if (countS1 === 3) {
                let user = await db.User.findOne( {
                where: { id: patient.userrportId },
                raw: false

            } )
            if ( user )
            {
                user.status = 2,
                    await user.save();
            }
            }
            resolve( {
                    errCode: 0,
                    errMessage: 'Update report succeed!'
            } );
                
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let sendEmailReport = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let image;
            if (!data.image) {
                image = "null"
            }
            else {
                image = data.image
            }
           let send = await sendEmail.senReport({
               emailreport: data.emailreport,
               userreport: data.userreport,
               comment: data.comment,
               content: data.content,
               post: data.post,
               time: data.time,
               image: image
            })
            resolve({
                errCode: 0,
                errMessage: 'Send email successfully!',
                data : send
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
 

let sendEmailReportPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let image;
            if (!data.image) {
                image = "null"
            }
            else {
                image = data.image
            }
           let send = await sendEmail.senReportPost({
               email: data.email,
               user: data.user,
               post: data.post,
               time: data.time,
               image: image
            })
            resolve({
                errCode: 0,
                errMessage: 'Send email successfully!',
                data : send
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
 

module.exports = {
    createreport: createreport,
    getreport: getreport,
    getreportById: getreportById,
    deletereport: deletereport,
    updatereport: updatereport,
    sendEmailReport: sendEmailReport,
    sendEmailReportPost: sendEmailReportPost
}