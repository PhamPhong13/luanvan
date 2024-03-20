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
    let User = await catService.getcat(req.query.page);
    return res.status( 200 ).json( User );
}

// get all patient
let getAllcat = async ( req, res ) =>
{
    let User = await catService.getAllcat(req.query.page, req.query.word);
    return res.status( 200 ).json( User );
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
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let handleSearchHeader = async ( req, res ) =>
{
    let cat = await catService.handleSearchHeader( req.query.search );
    return res.status( 200 ).json( cat );
}

 
module.exports = {
    createcat: createcat,
    getcat: getcat,
    getcatById: getcatById,
    deletecat: deletecat,
  updatecat: updatecat, 
    getAllCode: getAllCode,
    getAllcat: getAllcat,
    handleSearchHeader: handleSearchHeader
}