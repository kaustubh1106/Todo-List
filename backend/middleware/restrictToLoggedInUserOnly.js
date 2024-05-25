const {getUser} = require("../services/session")
const restrict = async (req,res,next)=>{
    const userUid = req.cookies.uid
    if(!userUid){
        console.log("hello this is req",userUid)
        return res.status(404).send("no uid found")
    }
    const user = await getUser(userUid)
    if(!user){
        return res.status(405).json({message:"no user found"})
    }
    req.user=user;   //req me kyu daala kyunki
    next()
}

module.exports = {restrict}