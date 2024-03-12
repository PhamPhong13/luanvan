import userformService from '../services/userformService';
let getuserformbyadminid = async (req, res) =>
{
    let User = await userformService.getuserformbyadminid(req.query.adminId, req.query.page);
    return res.status( 200 ).json( User );
}



module.exports = {
    getuserformbyadminid: getuserformbyadminid
}