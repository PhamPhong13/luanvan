import likepostService from '../services/likepostService';

// create a new patient
let createlikepost = async ( req, res ) =>
{
    let likepost = await likepostService.createlikepost( req.body );
    return res.status( 200 ).json( likepost );
}

// get all patient
let getlikepost = async ( req, res ) =>
{
    let likepost = await likepostService.getlikepost();
    return res.status( 200 ).json( likepost );
}

// get patient by id
let getlikepostById = async ( req, res ) =>
{
    let likepost = await likepostService.getlikepostById( req.query.userId, req.query.postId );
    return res.status( 200 ).json( likepost );
}

// get patient by id
let getAlllikepostById = async ( req, res ) =>
{
    let likepost = await likepostService.getAlllikepostById( req.query.id );
    return res.status( 200 ).json( likepost );
}
let deletelikepost = async ( req, res ) =>
{
    let likepost = await likepostService.deletelikepost( req.body.userId , req.body.postId );
    return res.status( 200 ).json( likepost );
}

let updatelikepost = async ( req, res ) =>
{
    let likepost = await likepostService.updatelikepost( req.body );
    return res.status( 200 ).json( likepost );
}

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await likepostService.getAllCode(req.query.type);
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
    createlikepost: createlikepost,
    getlikepost: getlikepost,
    getlikepostById: getlikepostById,
    deletelikepost: deletelikepost,
    updatelikepost: updatelikepost, 
    getAlllikepostById: getAlllikepostById
}