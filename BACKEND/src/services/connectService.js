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
            let total = await db.Connect.count();
            let patients = await db.Connect.findAll( );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list connect successfully!",
                    data: patients,
                    total: total
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

const { Op } = require('sequelize');

let getconnecttochart = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy ngày hiện tại
            const today = new Date();
            // Lấy ngày 7 ngày trước
            const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

            const connectCounts = await db.Connect.findAll({
                attributes: [
                    [db.sequelize.fn('DATE', db.sequelize.col('createdAt')), 'date'],
                    [db.sequelize.fn('COUNT', '*'), 'count']
                ],
                where: {
                    createdAt: {
                        [Op.between]: [sevenDaysAgo, today] // Lọc theo khoảng thời gian từ 7 ngày trước tới hiện tại
                    }
                },
                group: [db.sequelize.fn('DATE', db.sequelize.col('createdAt'))]
            });

            if (connectCounts) {
                resolve({
                    errCode: 0,
                    message: "Get connect count by date successfully!",
                    data: connectCounts
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Failed to get connect count by date!"
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};



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
    createconnect: createconnect, getconnecttochart: getconnecttochart,
    getconnectById: getconnectById,
    deleteconnect: deleteconnect,
    getconnect: getconnect
}