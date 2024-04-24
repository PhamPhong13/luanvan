import adminService from '../services/adminService';

let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    // nếu email or password = null
    // return 1 string json object
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await adminService.login(email, password);
  //check email exist
  //password nhap vao ko dung
  //return userInfor
  // access_token :JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// create a new patient
let createAdmin = async ( req, res ) =>
{
    let admin = await adminService.createAdmin( req.body );
    return res.status( 200 ).json( admin );
}

// get all patient
let getAdmin = async ( req, res ) =>
{
    let User = await adminService.getAdmin(req.query.page);
    return res.status( 200 ).json( User );
}

let getadmintunure = async ( req, res ) =>
{
    let User = await adminService.getadmintunure(req.query.tunure, req.query.position);
    return res.status( 200 ).json( User );
}

// get all patient
let getAllAdmin = async ( req, res ) =>
{
    let User = await adminService.getAllAdmin(req.query.page, req.query.word);
    return res.status( 200 ).json( User );
}


// get patient by id
let getAdminById = async ( req, res ) =>
{
    let admin = await adminService.getAdminById( req.query.id );
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

let updatePositionAdmin = async ( req, res ) =>
{
    let admin = await adminService.updatePositionAdmin( req.body );
    return res.status( 200 ).json( admin );
}

module.exports = {
    createAdmin: createAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    deleteAdmin: deleteAdmin,
    updateAdmin: updateAdmin,
  login: login,
  getAllAdmin: getAllAdmin,
  getadmintunure: getadmintunure,
  updatePositionAdmin: updatePositionAdmin
    
}