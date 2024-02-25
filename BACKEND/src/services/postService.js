import db from '../models/index';

// create a new patient
let createpost = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        if ( !data.name )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }

        try
        {
            await db.Post.create( {
                name: data.name,
                image: data.image,
                descMarkdown: data.descMarkdown,
                descHTML: data.descHTML,
                catId: data.catId,
                count: 0,
                adminId: data.adminId
            } );

            resolve( {
                errCode: 0,
                message: "Create a new post successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getpost = () =>
{
   

    return new Promise( async (resolve, reject) =>
    {
        try
        {
            let patients = await db.Post.findAll();

            if (patients.length > 0) {
                resolve({
                    errCode: 0,
                    message: "get list post successfully!",
                    data: patients,
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "No posts found for this page"
                });
            }
        }
        catch (err)
        {
            reject(err);
        }
    });
}

let getpostbypage = (page) =>
{
    const limit = 5; // Số lượng bài viết mỗi trang
    const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    return new Promise( async (resolve, reject) =>
    {
        try
        {
            let totalPosts = await db.Post.count(); // Đếm tổng số bài viết
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang

            // Sắp xếp ngược lại các bài viết
            let patients = await db.Post.findAll({
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit
            });

            if (patients.length > 0) {
                resolve({
                    errCode: 0,
                    message: "get list post successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "No posts found for this page"
                });
            }
        }
        catch (err)
        {
            reject(err);
        }
    });
}


//get patient by id
let getpostById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Post.findOne( {
                where: {
                    id: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get post successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get post failed!"
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
let getAllpostById = ( id ) =>
{
   
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
             
            let patients = await db.Post.findAll( {
                where: {
                    catId: id
                }
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get post successfully!",
                    data: patients,
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get post failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

let getAllpostBypage = (id, page) =>
{
    const limit = 3; // Số lượng bài viết mỗi trang
    const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
    
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            let totalPosts = await db.Post.count({ where: { catId: id } }); // Đếm tổng số bài viết theo điều kiện
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang

            let patients = await db.Post.findAll({
                where: {
                    catId: id
                },
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit
            });

            if (patients.length > 0) {
                resolve({
                    errCode: 0,
                    message: "get post successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "No posts found for this category and page"
                });
            }
        }
        catch (err)
        {
            reject(err);
        }
    });
}

// delete patient
let deletepost = ( id ) =>
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
        let Patient = await db.Post.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'Post not found!'
            } );
        }

        await db.Post.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete Post succeed!'
        } );
    } )
}

// update 
let updatepost = ( data ) =>
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
            let patient = await db.Post.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name;
                patient.image = data.image;
                patient.catId = data.catId;
                patient.descMarkdown = data.descMarkdown;
                patient.descHTML = data.descHTML,
                patient.count = data.count,
                patient.adminId = data.adminId,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update post succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'post not found!'
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
    createpost: createpost,
    getpost: getpost,
    getpostById: getpostById,
    deletepost: deletepost,
    updatepost: updatepost,
    getAllpostById: getAllpostById,
    getpostbypage: getpostbypage,
    getAllpostBypage: getAllpostBypage
}