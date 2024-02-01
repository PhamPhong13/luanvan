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
    let admin = await adminService.getAdmin();
    return res.status( 200 ).json( admin );
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

module.exports = {
    createAdmin: createAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    deleteAdmin: deleteAdmin,
    updateAdmin: updateAdmin,
    login: login
}