import nhiemkyService from '../services/nhiemkyService';

// create a new patient
let createnhiemky = async ( req, res ) =>
{
    let nhiemky = await nhiemkyService.createnhiemky( req.body );
    return res.status( 200 ).json( nhiemky );
}

// get all patient
let getnhiemky = async ( req, res ) =>
{
    let nhiemky = await nhiemkyService.getnhiemky();
    return res.status( 200 ).json( nhiemky );
}

// get patient by id
let getnhiemkyById = async ( req, res ) =>
{
    let nhiemky = await nhiemkyService.getnhiemkyById( req.query.id );
    return res.status( 200 ).json( nhiemky );
}

let deletenhiemky = async ( req, res ) =>
{
    let nhiemky = await nhiemkyService.deletenhiemky( req.body.id );
    return res.status( 200 ).json( nhiemky );
}

let updatenhiemky = async ( req, res ) =>
{
    let nhiemky = await nhiemkyService.updatenhiemky( req.body );
    return res.status( 200 ).json( nhiemky );
}

 
module.exports = {
    createnhiemky: createnhiemky,
    getnhiemky: getnhiemky,
    getnhiemkyById: getnhiemkyById,
    deletenhiemky: deletenhiemky,
  updatenhiemky: updatenhiemky, 
}