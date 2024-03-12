import db from '../models/index';

let getuserformbyadminid = (adminId, page) =>
{
    return new Promise(async (resolve, reject) =>
    {
        const limit = 3; // Số lượng biểu mẫu mỗi trang
        const offset = (page - 1) * limit;
        try
        {
            let totalForms = await db.Userform.count({
                where: {
                    adminId: adminId
                }
            }); // Đếm tổng số biểu mẫu
            let totalPages = Math.ceil(totalForms / limit); // Tính tổng số trang
            let forms = await db.Userform.findAll({
                where: {
                    adminId: adminId
                },
                include: [
                    { model: db.Form }
                ],
                order: [['createdAt', 'DESC']], // Sắp xếp theo ngày tạo giảm dần
                offset: offset,
                limit: limit,
                raw: true,
                nest: true
            });

            resolve({
                    errCode: 0,
                    message: "get list form successfully!",
                    data: forms,
                    total: totalForms,
                    totalPages: totalPages // Thêm thông tin về số trang vào đối tượng kết quả
                });
        }
        catch (err)
        {
            reject(err);
        }
    });
}



module.exports = {
    getuserformbyadminid: getuserformbyadminid
}