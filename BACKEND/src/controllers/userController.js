import userService from '../services/userService';

// create a new patient
let createUser = async ( req, res ) =>
{
    let User = await userService.createUser( req.body );
    return res.status( 200 ).json( User );
}

// get all patient
let getUser = async ( req, res ) =>
{
    let User = await userService.getUser();
    return res.status( 200 ).json( User );
}

// get patient by id
let getUserById = async ( req, res ) =>
{
    let User = await userService.getUserById( req.query.id );
    return res.status( 200 ).json( User );
}

let deleteUser = async ( req, res ) =>
{
    let User = await userService.deleteUser( req.body.id );
    return res.status( 200 ).json( User );
}

let updateUser = async ( req, res ) =>
{
    let User = await userService.updateUser( req.body );
    return res.status( 200 ).json( User );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json(data);

    }
    catch (err) {
        console.log("Get all code error", err);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}



let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.login(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let usersendemail = async (req, res) => {
    try {

        let patient = await userService.usersendemail(req.body);
        return res.status(200).json(patient);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}
 
module.exports = {
    createUser: createUser,
    getUser: getUser,
    getUserById: getUserById,
    deleteUser: deleteUser,
    updateUser: updateUser, 
    getAllCode: getAllCode,
    login: login,
    usersendemail: usersendemail
}