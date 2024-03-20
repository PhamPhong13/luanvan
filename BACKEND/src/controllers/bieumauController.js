import bieumauService from '../services/bieumauService';

// create a new patient
let createbieumau = async ( req, res ) =>
{
    let bieumau = await bieumauService.createbieumau( req.body );
    return res.status( 200 ).json( bieumau );
}

// get all patient
let getbieumau = async ( req, res ) =>
{
    let User = await bieumauService.getbieumau(req.query.page);
    return res.status( 200 ).json( User );
}


let deletebieumau = async ( req, res ) =>
{
    let bieumau = await bieumauService.deletebieumau( req.body.id );
    return res.status( 200 ).json( bieumau );
}

let updatebieumau = async ( req, res ) =>
{
    let bieumau = await bieumauService.updatebieumau( req.body );
    return res.status( 200 ).json( bieumau );
}


 
module.exports = {
    createbieumau: createbieumau,
    getbieumau: getbieumau,
    deletebieumau: deletebieumau,
    updatebieumau: updatebieumau, 
}