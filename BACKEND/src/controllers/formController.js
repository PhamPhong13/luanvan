import formService from '../services/formService';

let createform = async ( req, res ) =>
{
    let form = await formService.createform( req.body );
    return res.status( 200 ).json( form );
}

let createuserform = async ( req, res ) =>
{
    let form = await formService.createuserform( req.body );
    return res.status( 200 ).json( form );
}

let createkeyform = async ( req, res ) =>
{
    let form = await formService.createkeyform( req.body );
    return res.status( 200 ).json( form );
}

let createanswerquestion = async ( req, res ) =>
{
    let form = await formService.createanswerquestion( req.body );
    return res.status( 200 ).json( form );
}



let getformbyid = async ( req, res ) =>
{
    let form = await formService.getformbyid( req.query.postId );
    return res.status( 200 ).json( form );
}

let updateform = async ( req, res ) =>
{
    let form = await formService.updateform( req.body );
    return res.status( 200 ).json( form );
}

let updatekeyform = async ( req, res ) =>
{
    let form = await formService.updateform( req.body );
    return res.status( 200 ).json( form );
}
 
// get all patient
let getkeyform = async ( req, res ) =>
{
    let form = await formService.getkeyform(req.query.id);
    return res.status( 200 ).json( form );
}

let deletekeyform = async ( req, res ) =>
{
    let form = await formService.deletekeyform(  req.body.id );
    return res.status( 200 ).json( form );
}

let deleteform = async ( req, res ) =>
{
    let form = await formService.deleteform(  req.body.id );
    return res.status( 200 ).json( form );
}

module.exports = {
    createform: createform,
    createuserform: createuserform,
    createkeyform: createkeyform,
    getformbyid: getformbyid,
    updateform: updateform,
    getkeyform: getkeyform,
    updatekeyform: updatekeyform,
    deletekeyform: deletekeyform,
    createanswerquestion: createanswerquestion,
    deleteform: deleteform
}