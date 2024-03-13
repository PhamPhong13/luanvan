import historyService from '../services/historyService';

// create a new patient
let createhistory = async ( req, res ) =>
{
    let history = await historyService.createhistory( req.body );
    return res.status( 200 ).json( history );
}

// get all patient
let gethistory = async ( req, res ) =>
{
    let history = await historyService.gethistory();
    return res.status( 200 ).json( history );
}

// get patient by id
let gethistoryById = async ( req, res ) =>
{
    let history = await historyService.gethistoryById( req.query.userId );
    return res.status( 200 ).json( history );
}

// get patient by id
let getAllhistoryById = async ( req, res ) =>
{
    let history = await historyService.getAllhistoryById( req.query.id );
    return res.status( 200 ).json( history );
}
let deletehistory = async ( req, res ) =>
{
    let history = await historyService.deletehistory( req.body.userId , req.body.postId );
    return res.status( 200 ).json( history );
}

let updatehistory = async ( req, res ) =>
{
    let history = await historyService.updatehistory( req.body );
    return res.status( 200 ).json( history );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await historyService.getAllCode(req.query.type);
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
    createhistory: createhistory,
    gethistory: gethistory,
    gethistoryById: gethistoryById,
    deletehistory: deletehistory,
    updatehistory: updatehistory, 
    getAllhistoryById: getAllhistoryById
}