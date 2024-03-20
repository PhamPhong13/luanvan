import repcommentService from '../services/repcommentService';

// create a new patient
let createrepcomment = async ( req, res ) =>
{
    let repcomment = await repcommentService.createrepcomment( req.body );
    return res.status( 200 ).json( repcomment );
}

// get all patient
let getrepcomment = async ( req, res ) =>
{
    let repcomment = await repcommentService.getrepcomment();
    return res.status( 200 ).json( repcomment );
}

// get patient by id
let getrepcommentById = async ( req, res ) =>
{
    let repcomment = await repcommentService.getrepcommentById( req.query.id );
    return res.status( 200 ).json( repcomment );
}

let deleterepcomment = async ( req, res ) =>
{
    let repcomment = await repcommentService.deleterepcomment( req.body.id );
    return res.status( 200 ).json( repcomment );
}

let deleterepcommentbycomment = async ( req, res ) =>
{
    let repcomment = await repcommentService.deleterepcommentbycomment( req.body.id );
    return res.status( 200 ).json( repcomment );
}

let updaterepcomment = async ( req, res ) =>
{
    let repcomment = await repcommentService.updaterepcomment( req.body );
    return res.status( 200 ).json( repcomment );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await repcommentService.getAllCode(req.query.type);
        return res.status(200).json(data);

    }
    catch (err) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

 
module.exports = {
    createrepcomment: createrepcomment,
    getrepcomment: getrepcomment,
    getrepcommentById: getrepcommentById,
    deleterepcomment: deleterepcomment,
  updaterepcomment: updaterepcomment, 
    getAllCode: getAllCode,
    deleterepcommentbycomment: deleterepcommentbycomment
    /* login: login */
}