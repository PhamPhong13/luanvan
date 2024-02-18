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

 
module.exports = {
    createUser: createUser,
    getUser: getUser,
    getUserById: getUserById,
    deleteUser: deleteUser,
  updateUser: updateUser, 
    getAllCode: getAllCode,
    /* login: login */
}