import clinicService from '../services/clinicService';

let createClinic = async (req, res) => { 
    let clinic = await clinicService.createClinic( req.body );
    return res.status( 200 ).json( clinic );
}



// get all patient
let getClinic = async ( req, res ) =>
{
    let clinic = await clinicService.getClinic();
    return res.status( 200 ).json( clinic );
}

// get patient by id
let getClinicById = async ( req, res ) =>
{
    let clinic = await clinicService.getClinicById( req.query.id );
    return res.status( 200 ).json( clinic );
}

let deleteClinic = async ( req, res ) =>
{
    let clinic = await clinicService.deleteClinic( req.body.id );
    return res.status( 200 ).json( clinic );
}

let updateClinic = async ( req, res ) =>
{
    let clinic = await clinicService.updateClinic( req.body );
    return res.status( 200 ).json( clinic );
}


module.exports = {
    createClinic: createClinic,
    getClinic: getClinic,
    getClinicById: getClinicById,
    deleteClinic: deleteClinic,
    updateClinic: updateClinic
}
