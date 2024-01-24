import doctorService from '../services/doctorService';
//get
let createDoctor = async ( req, res ) =>
{
    let doctor = await doctorService.createDoctor( req.body );
    return res.status( 200 ).json( doctor );
}


// get all patient
let getDoctor = async ( req, res ) =>
{
    let patient = await doctorService.getDoctor();
    return res.status( 200 ).json( patient );
}

// get patient by id
let getDoctorById = async ( req, res ) =>
{
    let patient = await doctorService.getDoctorById( req.body.id );
    return res.status( 200 ).json( patient );
}

let deleteDoctor = async ( req, res ) =>
{
    let patient = await doctorService.deleteDoctor( req.body.id );
    return res.status( 200 ).json( patient );
}

let updateDoctor = async ( req, res ) =>
{
    let patient = await doctorService.updateDoctor( req.body );
    return res.status( 200 ).json( patient );
}

module.exports = {
    createDoctor: createDoctor,
    getDoctor: getDoctor,
    getDoctorById: getDoctorById,
    deleteDoctor: deleteDoctor,
    updateDoctor: updateDoctor
}