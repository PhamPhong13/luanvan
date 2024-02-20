import commentService from '../services/commentService';

// create a new patient
let createcomment = async ( req, res ) =>
{
    let comment = await commentService.createcomment( req.body );
    return res.status( 200 ).json( comment );
}

// get all patient
let getcomment = async ( req, res ) =>
{
    let comment = await commentService.getcomment();
    return res.status( 200 ).json( comment );
}

// get patient by id
let getcommentById = async ( req, res ) =>
{
    let comment = await commentService.getcommentById( req.query.id );
    return res.status( 200 ).json( comment );
}

let deletecomment = async ( req, res ) =>
{
    let comment = await commentService.deletecomment( req.body.id );
    return res.status( 200 ).json( comment );
}

let updatecomment = async ( req, res ) =>
{
    let comment = await commentService.updatecomment( req.body );
    return res.status( 200 ).json( comment );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await commentService.getAllCode(req.query.type);
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
    createcomment: createcomment,
    getcomment: getcomment,
    getcommentById: getcommentById,
    deletecomment: deletecomment,
  updatecomment: updatecomment, 
    getAllCode: getAllCode,
    /* login: login */
}