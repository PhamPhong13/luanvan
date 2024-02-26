import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// create a new patient
let createcat = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        // check input parameters
        if ( !data.name )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }

        try
        {
            await db.Cat.create( {
                name: data.name,
            } );
            

            resolve( {
                errCode: 0,
                message: "Create a new cat successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getcat = (page) =>
{
    
    if (page === "undefined") page = 1; // nếu page = undefined
    return new Promise( async ( resolve, reject ) =>
    {
         const limit = 5; // Số lượng bài viết mỗi trang
        const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        try
        {
            let totalPosts = await db.Cat.count(); // Đếm tổng số bài viết
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang
            let patients = await db.Cat.findAll( {
                attributes: {
                    exclude: [ 'password' ]
                },
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit
                
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list cat successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list cat failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

let getAllcat = (page, word) => {
    if (page === "undefined") page = 1; // nếu page = undefined
    return new Promise(async (resolve, reject) => {
        const limit = 5; // Số lượng bài viết mỗi trang
        const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        try {
            let findOptions = {
                attributes: {
                    exclude: ['password']
                },
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit
            };

            let whereClause = {}; // Điều kiện tìm kiếm

            // Nếu có từ khóa tìm kiếm, thêm điều kiện vào whereClause
            if (word && word !== "undefined") {
                whereClause = {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + word + '%' } }, // Tìm kiếm theo username
                    ]
                };

                findOptions.where = whereClause;
            }

            let totalPosts = await db.Cat.count({ where: whereClause }); // Đếm tổng số bài viết phù hợp
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang

            // Lấy danh sách người dùng
            let patients = await db.Cat.findAll(findOptions);

            if (patients) {
                resolve({
                    errCode: 0,
                    message: "get list cat successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "get list cat failed!"
                });
            }

        } catch (err) {
            reject(err);
        }
    });
};

//get patient by id
let getcatById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Cat.findOne( {
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
                    message: "get cat successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get cat failed!"
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
let deletecat = ( id ) =>
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
        let Patient = await db.Cat.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'cat not found!'
            } );
        }

        await db.Cat.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete cat succeed!'
        } );
    } )
}

// update 
let updatecat = ( data ) =>
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
            let patient = await db.Cat.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update cat succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'cat not found!'
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
    createcat: createcat,
    getcat: getcat,
    getcatById: getcatById,
    deletecat: deletecat,
    updatecat: updatecat,
    getAllcat: getAllcat
}