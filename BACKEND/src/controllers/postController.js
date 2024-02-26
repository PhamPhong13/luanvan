import postService from '../services/postService';

// create a new patient
let createpost = async ( req, res ) =>
{
    let post = await postService.createpost( req.body );
    return res.status( 200 ).json( post );
}



// get all patient
let getpost = async ( req, res ) =>
{
    let User = await postService.getpost(req.query.page);
    return res.status( 200 ).json( User );
}

// get all patient
let getAllpost = async ( req, res ) =>
{
    let User = await postService.getAllpost(req.query.page, req.query.word);
    return res.status( 200 ).json( User );
}


// get patient by id
let getpostById = async ( req, res ) =>
{
    let post = await postService.getpostById( req.query.id );
    return res.status( 200 ).json( post );
}



// get patient by id
let getAllpostById = async ( req, res ) =>
{
    let post = await postService.getAllpostById( req.query.id );
    return res.status( 200 ).json( post );
}

let getAllpostBypage = async ( req, res ) =>
{
    let post = await postService.getAllpostBypage( req.query.id, req.query.page );
    return res.status( 200 ).json( post );
}

let deletepost = async ( req, res ) =>
{
    let post = await postService.deletepost( req.body.id );
    return res.status( 200 ).json( post );
}

let updatepost = async ( req, res ) =>
{
    let post = await postService.updatepost( req.body );
    return res.status( 200 ).json( post );
}

 
module.exports = {
    createpost: createpost,
    getpost: getpost,
    getpostById: getpostById,
    deletepost: deletepost,
  updatepost: updatepost, 
    getAllpostById: getAllpostById,
    getAllpost: getAllpost,
    getAllpostBypage: getAllpostBypage
}