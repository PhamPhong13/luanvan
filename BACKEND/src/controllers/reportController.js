import reportService from '../services/reportService';

// create a new patient
let createreport = async ( req, res ) =>
{
    let report = await reportService.createreport( req.body );
    return res.status( 200 ).json( report );
}

// get all patient
let getreport = async ( req, res ) =>
{
    let report = await reportService.getreport(req.query.id, req.query.status, req.query.page );
    return res.status( 200 ).json( report );
}

// get patient by id
let getreportById = async ( req, res ) =>
{
    let report = await reportService.getreportById( req.query.id );
    return res.status( 200 ).json( report );
}

let deletereport = async ( req, res ) =>
{
    let report = await reportService.deletereport( req.body.id );
    return res.status( 200 ).json( report );
}

let updatereport = async ( req, res ) =>
{
    let report = await reportService.updatereport( req.body );
    return res.status( 200 ).json( report );
}

 
module.exports = {
    createreport: createreport,
    getreport: getreport,
    getreportById: getreportById,
    deletereport: deletereport,
  updatereport: updatereport, 
}