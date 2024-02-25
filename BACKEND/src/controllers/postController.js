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
    let post = await postService.getpost();
    return res.status( 200 ).json( post );
}


// get all patient
let getpostbypage = async ( req, res ) =>
{
    let post = await postService.getpostbypage(req.query.page);
    return res.status( 200 ).json( post );
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

// get all code table
let getAllCode = async (req, res) => {
    try {
        let data = await postService.getAllCode(req.query.type);
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
    createpost: createpost,
    getpost: getpost,
    getpostById: getpostById,
    deletepost: deletepost,
  updatepost: updatepost, 
    getAllpostById: getAllpostById,
    getpostbypage: getpostbypage,
    getAllpostBypage: getAllpostBypage
}