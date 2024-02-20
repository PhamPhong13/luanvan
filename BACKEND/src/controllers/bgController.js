import bgService from '../services/bgService';

// create a new patient
let createbg = async ( req, res ) =>
{
    let bg = await bgService.createbg( req.body );
    return res.status( 200 ).json( bg );
}

// get all patient
let getbg = async ( req, res ) =>
{
    let bg = await bgService.getbg();
    return res.status( 200 ).json( bg );
}

// get patient by id
let getbgById = async ( req, res ) =>
{
    let bg = await bgService.getbgById( req.query.id );
    return res.status( 200 ).json( bg );
}

let deletebg = async ( req, res ) =>
{
    let bg = await bgService.deletebg( req.body.id );
    return res.status( 200 ).json( bg );
}

let updatebg = async ( req, res ) =>
{
    let bg = await bgService.updatebg( req.body );
    return res.status( 200 ).json( bg );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await bgService.getAllCode(req.query.type);
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
    createbg: createbg,
    getbg: getbg,
    getbgById: getbgById,
    deletebg: deletebg,
  updatebg: updatebg, 
}