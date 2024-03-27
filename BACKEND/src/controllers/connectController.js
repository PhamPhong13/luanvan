import connectService from '../services/connectService';

// create a new patient
let createconnect = async ( req, res ) =>
{
    let connect = await connectService.createconnect( req.body );
    return res.status( 200 ).json( connect );
}

// get all patient
let getconnect = async ( req, res ) =>
{
    let connect = await connectService.getconnect();
    return res.status( 200 ).json( connect );
}

let getconnecttochart = async ( req, res ) =>
{
    let connect = await connectService.getconnecttochart();
    return res.status( 200 ).json( connect );
}

// get patient by id
let getconnectById = async ( req, res ) =>
{
    let connect = await connectService.getconnectById( req.query.postId );
    return res.status( 200 ).json( connect );
}

// get patient by id
let getAllconnectById = async ( req, res ) =>
{
    let connect = await connectService.getAllconnectById( req.query.id );
    return res.status( 200 ).json( connect );
}
let deleteconnect = async ( req, res ) =>
{
    let connect = await connectService.deleteconnect( req.body.userId , req.body.postId );
    return res.status( 200 ).json( connect );
}

let updateconnect = async ( req, res ) =>
{
    let connect = await connectService.updateconnect( req.body );
    return res.status( 200 ).json( connect );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await connectService.getAllCode(req.query.type);
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
    createconnect: createconnect,
    getconnect: getconnect,
    getconnectById: getconnectById,
    deleteconnect: deleteconnect,
    updateconnect: updateconnect, 
    getAllconnectById: getAllconnectById, getconnecttochart: getconnecttochart
}