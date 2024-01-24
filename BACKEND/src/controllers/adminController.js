import adminService from '../services/adminService';

// create a new patient
let createAdmin = async ( req, res ) =>
{
    let admin = await adminService.createAdmin( req.body );
    return res.status( 200 ).json( admin );
}

// get all patient
let getAdmin = async ( req, res ) =>
{
    let admin = await adminService.getAdmin();
    return res.status( 200 ).json( admin );
}

// get patient by id
let getAdminById = async ( req, res ) =>
{
    let admin = await adminService.getAdminById( req.body.id );
    return res.status( 200 ).json( admin );
}

let deleteAdmin = async ( req, res ) =>
{
    let admin = await adminService.deleteAdmin( req.body.id );
    return res.status( 200 ).json( admin );
}

let updateAdmin = async ( req, res ) =>
{
    let admin = await adminService.updateAdmin( req.body );
    return res.status( 200 ).json( admin );
}

module.exports = {
    createAdmin: createAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    deleteAdmin: deleteAdmin,
    updateAdmin: updateAdmin
}