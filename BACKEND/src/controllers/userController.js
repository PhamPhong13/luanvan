import userService from '../services/userService';
let login = async ( req, res ) =>
{
    let email = req.body.email;
    let password = req.body.password;

    if ( !email || !password ) // nếu email or password = null
    {
        // return 1 string json object
        return res.status( 500 ).json( {
            errCode: 1,
            message: 'Missing inputs parameter!'
        } )
    }

    let userData = await userService.login( email, password )
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status( 200 ).json( {
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    } )
}


// get all code table
let getAllCode = async ( req, res ) =>
{
    try
    {
        let data = await userService.getAllCode( req.query.type );
        return res.status( 200 ).json( data );

    }
    catch ( err )
    {
        console.log( "Get all code error", err );
        return res.status( 200 ).json( {
            errCode: -1,
            errMessage: "Error from server!"
        } )
    }
}

module.exports = {
    login: login,
    getAllCode: getAllCode
}