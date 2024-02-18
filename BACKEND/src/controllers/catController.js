import catService from '../services/catService';

// create a new patient
let createcat = async ( req, res ) =>
{
    let cat = await catService.createcat( req.body );
    return res.status( 200 ).json( cat );
}

// get all patient
let getcat = async ( req, res ) =>
{
    let cat = await catService.getcat();
    return res.status( 200 ).json( cat );
}

// get patient by id
let getcatById = async ( req, res ) =>
{
    let cat = await catService.getcatById( req.query.id );
    return res.status( 200 ).json( cat );
}

let deletecat = async ( req, res ) =>
{
    let cat = await catService.deletecat( req.body.id );
    return res.status( 200 ).json( cat );
}

let updatecat = async ( req, res ) =>
{
    let cat = await catService.updatecat( req.body );
    return res.status( 200 ).json( cat );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await catService.getAllCode(req.query.type);
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
    createcat: createcat,
    getcat: getcat,
    getcatById: getcatById,
    deletecat: deletecat,
  updatecat: updatecat, 
    getAllCode: getAllCode,
    /* login: login */
}