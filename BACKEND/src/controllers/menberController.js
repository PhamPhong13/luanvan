import menberService from '../services/menberService';

// create a new patient
let createmenber = async ( req, res ) =>
{
    let menber = await menberService.createmenber( req.body );
    return res.status( 200 ).json( menber );
}

// get all patient
let getmenber = async ( req, res ) =>
{
    let menber = await menberService.getmenber();
    return res.status( 200 ).json( menber );
}

// get patient by id
let getmenberById = async ( req, res ) =>
{
    let menber = await menberService.getmenberById( req.query.id, req.query.position );
    return res.status( 200 ).json( menber );
}

let deletemenber = async ( req, res ) =>
{
    let menber = await menberService.deletemenber( req.body.id );
    return res.status( 200 ).json( menber );
}

let updatemenber = async ( req, res ) =>
{
    let menber = await menberService.updatemenber( req.body );
    return res.status( 200 ).json( menber );
}

 
module.exports = {
    createmenber: createmenber,
    getmenber: getmenber,
    getmenberById: getmenberById,
    deletemenber: deletemenber,
  updatemenber: updatemenber, 
}