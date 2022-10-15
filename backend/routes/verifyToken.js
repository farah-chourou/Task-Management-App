const jwt = require("jsonwebtoken")

module.exports = function( req, res , next ){
    const token =  req.headers.authorization.split(" ")[1];

    console.log("accTo "+token)
    if(!token){
        return res.status(401).send("Access Denied") }
    try {
        const verified = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET) // passina lclé secret pour dechiffrer token 

      
        req.user= verified  // nraja3 fi req.user  data mta3 luser ili dechifirneha mil token bich kol route yabda aandi acce lil data ta3 l user
        next() // bich najm netaada lil traitement ili fil api 
    } catch (error) {
        res.status(401).send('invalid token ')
    }
    
}