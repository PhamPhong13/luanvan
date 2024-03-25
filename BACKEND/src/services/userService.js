import db from '../models/index';
import bcrypt from 'bcryptjs';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

import sendEmail from "./sendEmail"

let builURLEmail = () =>
{
    let result = '';
    result = `${ process.env.URL_REACT }/login-user`
    return result;
}

const salt = bcrypt.genSaltSync( 10 );
// hash password
let hashUserPassword = ( password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync( password, salt );

            resolve( hashPassWord );
        } catch ( e )
        {
            reject( e );
        }

    } )
}

// check email address
let checkUserEmail = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.User.findOne( {
                where: { email: userEmail }
            } )
            if ( user )
            {
                resolve( true )
            } else
            {
                resolve( false )
            }

        } catch ( e )
        {
            reject( e )
        }
    } )
}


let login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};


// create a new patient
let createUser = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        // check input parameters
        if ( !data.fullName || !data.email )
        {
            resolve( {
                errCode: 1,
                message: "Missing required parameter!"
            } )
        }

        try
        {
            let checkEmail = await checkUserEmail( data.email );
            if ( checkEmail === true )
            {
                resolve( {
                    errCode: 3,
                    message: "Your's Email is already exist in our system, plz try other email!"
                } )
            }
            let hashPassWord = await hashUserPassword( data.password );
            await db.User.create( {
                email: data.email,
                password: hashPassWord,
                fullName: data.fullName,
                phone: data.phone,
                image: data.image,
                desc: data.desc,
                status: '1'
            } );

            resolve( {
                errCode: 0,
                message: "Create a new user successfully!"
            } )
        }
        catch ( err )
        {
            reject( err );
        }


    } )
}
// get all patient
let getUser = (page) =>
{
    
    if (page === "undefined") page = 1; // nếu page = undefined
    return new Promise( async ( resolve, reject ) =>
    {
         const limit = 5; // Số lượng bài viết mỗi trang
        const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        try
        {
            let totalPosts = await db.User.count(); // Đếm tổng số bài viết
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang
            let patients = await db.User.findAll( {
                attributes: {
                    exclude: [ 'password' ]
                },
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần (ngược lại)
                offset: offset,
                limit: limit,
                where: { status: '1' },
                raw: true
                
            } );
            if ( patients )
            {
                resolve( {
                    errCode: 0,
                    message: "get list User successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get list User failed!"
                } )
            }

        }
        catch ( err )
        {
            reject( err );
        }
    } )
}

// get all patient
let getuserbystatus = (page, word, st) => {
    return new Promise(async (resolve, reject) => {
        const limit = 5; // Số lượng bài viết mỗi trang
        const offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại
        try {
            let condition = { status: '0' }; // Điều kiện ban đầu để lấy người dùng có trạng thái '0'
            if (word !== '') {
                condition.fullName = { [Op.like]: `%${word}%` }; // Thêm điều kiện tìm kiếm tên người dùng nếu từ khóa không rỗng
            }
            if (st !== undefined) {
                condition.status = st; // Thêm điều kiện trạng thái nếu nó được cung cấp
            }

            let totalPosts = await db.User.count({ where: condition }); // Đếm tổng số bài viết theo điều kiện
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang
            let patients = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                offset: offset,
                limit: limit,
                where: condition,
                raw: true
            });
            if (patients) {
                resolve({
                    errCode: 0,
                    message: "get list User successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "get list User failed!"
                })
            }

        } catch (err) {
            reject(err);
        }
    })
}


let getAllUser = (page, word) => {
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
                        { email: { [Op.like]: '%' + word + '%' } }, // Tìm kiếm theo email, bạn có thể thêm các trường khác nếu cần
                        { fullName: { [Op.like]: '%' + word + '%' } }, // Tìm kiếm theo username
                        { phone: { [Op.like]: '%' + word + '%' } }, // Tìm kiếm theo username
                    ]
                };

                findOptions.where = whereClause;
            }

            let totalPosts = await db.User.count({ where: whereClause }); // Đếm tổng số bài viết phù hợp
            let totalPages = Math.ceil(totalPosts / limit); // Tính tổng số trang

            // Lấy danh sách người dùng
            let patients = await db.User.findAll(findOptions);

            if (patients) {
                resolve({
                    errCode: 0,
                    message: "get list User successfully!",
                    data: patients,
                    total: totalPosts,
                    totalPages: totalPages
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "get list User failed!"
                });
            }

        } catch (err) {
            reject(err);
        }
    });
};


//get patient by id
let getUserById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.User.findOne( {
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
                    message: "get User successfully!",
                    data: patients
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    message: "get User failed!"
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
let deleteUser = ( id ) =>
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
        let Patient = await db.User.findOne( {
            where: { id: id },
        } );

        if ( !Patient )
        {
            resolve( {
                errCode: 2,
                errMessage: 'User not found!'
            } );
        }

        await db.User.destroy( {
            where: { id: id },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete User succeed!'
        } );
    } )
}

// update 
let updateUser = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.id || !data.email || !data.fullName )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let patient = await db.User.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.email = data.email;
                patient.fullName = data.fullName;
                patient.phone = data.phone;
                patient.image = data.image,
                patient.desc = data.desc,
                patient.status = data.status,
                    await patient.save();
                
                resolve( {
                    errCode: 0,
                    errMessage: 'Update User succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'User not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}
 
let examineUser = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.id || !data.email || !data.fullName )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let patient = await db.User.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.email = data.email;
                patient.fullName = data.fullName;
                patient.phone = data.phone;
                patient.image = data.image,
                patient.desc = data.desc,
                patient.status = data.status,
                    await patient.save();
                
                await sendEmail.sendCreateUserSuccess({
                    email: patient.email,
                    name: patient.fullName,
                    phone: patient.phone,
                    redirectLink: builURLEmail( )
                })

                resolve( {
                    errCode: 0,
                    errMessage: 'Update User succeed!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'User not found!'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter '
                })

            }
            else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}


let usersendemail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await sendEmail.sendAttachment({
                email: data.email,
                content: data.content,
                name: data.name
            })
            resolve({
                errCode: 0,
                errMessage: 'Send email successfully!',
            })
        }
        catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    createUser: createUser,
    getUser: getUser,
    getUserById: getUserById,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCode: getAllCode,
    login: login,
    usersendemail: usersendemail,
    getAllUser: getAllUser,
    getuserbystatus: getuserbystatus,
    builURLEmail: builURLEmail,
    examineUser: examineUser
}