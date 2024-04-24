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

let createanswerform = async ( req, res ) =>
{
    let form = await formService.createanswerform( req.body );
    return res.status( 200 ).json( form );
}

let getanswerform = async ( req, res ) =>
{
    let form = await formService.getanswerform( req.query.id, req.query.userId );
    return res.status( 200 ).json( form );
}

let updateanswerform = async ( req, res ) =>
{
    let form = await formService.updateanswerform( req.body );
    return res.status( 200 ).json( form );
}

let deleteanswerform = async ( req, res ) =>
{
    let form = await formService.deleteanswerform(  req.body.id, req.body.userId );
    return res.status( 200 ).json( form );
}



let getformusersubmit = async ( req, res ) =>
{
    let form = await formService.getformusersubmit( req.query.formId, req.query.userId );
    return res.status( 200 ).json( form );
}

let updateformusersubmit = async ( req, res ) =>
{
    let form = await formService.updateformusersubmit( req.body );
    return res.status( 200 ).json( form );
}

let getform = async ( req, res ) =>
{
    let form = await formService.getform(req.query.page, req.query.id);
    return res.status( 200 ).json( form );
}

let getuserform = async ( req, res ) =>
{
    let form = await formService.getuserform(req.query.formId);
    return res.status( 200 ).json( form );
}


let getkeyformbyid = async ( req, res ) =>
{

    let form = await formService.getkeyformbyid( req.query.id );
    return res.status( 200 ).json( form );
}

let getformbykey = async ( req, res ) =>
{
    let form = await formService.getformbykey( req.query.id );
    return res.status( 200 ).json( form );
}


let deleteuserform = async ( req, res ) =>
{
    let form = await formService.deleteuserform(  req.body.formId, req.body.adminId );
    return res.status( 200 ).json( form );
}

let getAllForm = async ( req, res ) =>
{
    let form = await formService.getAllForm( req.query.page, req.query.adminId, req.query.word );
    return res.status( 200 ).json( form );
}

module.exports = {
    createform: createform,    createuserform: createuserform, getAllForm: getAllForm,
    createkeyform: createkeyform,    getformbyid: getformbyid,
    updateform: updateform,    getkeyform: getkeyform,
    updatekeyform: updatekeyform,    deletekeyform: deletekeyform,
    createanswerquestion: createanswerquestion,    deleteform: deleteform,
    createanswerform: createanswerform,    getanswerform: getanswerform,
    updateanswerform: updateanswerform,    deleteanswerform: deleteanswerform,
    getformusersubmit: getformusersubmit, updateformusersubmit: updateformusersubmit,
    getform: getform, getkeyformbyid: getkeyformbyid, getformbykey: getformbykey,
    getuserform: getuserform, deleteuserform: deleteuserform
}