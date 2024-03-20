import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// create a new patient
let createbieumau = ( data ) =>
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
            await db.Bieumau.create( {
                name: data.name,
            } );
            

            resolve( {
                errCode: 0,
                message: "Create a new bieumau successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getbieumau = (page) =>
{
    if (page === "ALL") {
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Bieumau.findAll( {
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list bieumau successfully!",
                    data: patients,
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list bieumau failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
    }
    else {
        if (page === "undefined") page = 1; // nếu page = undefined
    return new Promise( async ( resolve, reject ) =>
    {
         const limit = 5; // Số lượng bài viết mỗi trang
        const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        try
        {
            let totalPosts = await db.Bieumau.count(); // Đếm tổng số bài viết
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang
            let patients = await db.Bieumau.findAll( {
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit
                
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list bieumau successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list bieumau failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
    }
    
}

// delete patient
let deletebieumau = ( id ) =>
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
        let Patient = await db.Bieumau.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'bieumau not found!'
            } );
        }

        await db.Bieumau.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete bieumau succeed!'
        } );
    } )
}

// update 
let updatebieumau = ( data ) =>
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
            let patient = await db.Bieumau.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.name = data.name,
                await patient.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update bieumau succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'bieumau not found!'
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
    createbieumau: createbieumau,
    getbieumau: getbieumau,
    deletebieumau: deletebieumau,
    updatebieumau: updatebieumau,

}