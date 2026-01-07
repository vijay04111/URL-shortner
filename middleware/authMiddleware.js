const { getUser } = require("../services/auth");

 
async function loginRestricaton(req,res,next){
    let userId=req.cookies?.uid;

    if(!userId)
    {
        return res.redirect('/login')
    }
    let user=getUser(userId)
    if(!user)
    {
        return res.redirect('/login')
    }

    req.user=user;
    next()

}

module.exports={
    loginRestricaton
}