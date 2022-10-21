const express = require('express')
const router = express.Router()
const userModel = require("../models/UserModel")
const Joi = require("@hapi/joi")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyToken = require('./verifyToken')
const userToken = require("../models/UserToken")

const validationRegister = Joi.object({ 
    name: Joi.string().required().min(3), 
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)

} )


const validationLogin = Joi.object({ 
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)

} )

router.post("/register",  async(req,res)=>{
    console.log(req.body)

    const validation =  validationRegister.validate(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message)

    const existEmail =  await userModel.findOne({email: req.body.email})
    if(existEmail){
        return res.status(400).send("email already exist ")
    }

    const difficult = await bycrypt.genSaltSync(10)// difficult of 10 charcter
    const hashedPassword = await bycrypt.hash(req.body.password, difficult)


    const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
}) 
 
    try {
        const savedUser = await user.save()
        //normalement nasna3 access token valide lwa9t s8iir barka baad ylogini aala rou7ou
        const accessToken = await user.createAccessToken()
        const refreshToken = await user.createRefreshToken()
        return res.status(201).header( 'authorization' , {accessToken,refreshToken} ).send( {accessToken,refreshToken} ) ;
    } catch (error) {
        res.status(400).send(error)
        
    }

})

 
router.post("/login", async (req, res) => {


    const validation =  await validationLogin.validate(req.body);
    if(validation.error){
     return res.status(400).send(validation.error.details[0].message)
    } 
   
    const user = await userModel.findOne({email: req.body.email })
    if (!user){
        return res.status(400).send(" email dosen't exist ")
    } 
    const existPassword = await bycrypt.compare(req.body.password, user.password)
    if(!existPassword){
        return res.status(400).send("password incorrect ")
    }

    const accessToken = await user.createAccessToken()
    const refreshToken = await user.createRefreshToken()
    return res.status(201).header( 'authorization' , {accessToken,refreshToken} ).send( {accessToken,refreshToken} ) ;
    
    //  res.status(200).send("user is logged in  ")

    

})

router.get("/me", verifyToken, async (req, res) => {
  return res.send(req.user)
  console.log("step 1 ")

})


router.post("/refreshtoken", async (req,res) =>{
    try{ 
      const refreshToken =  req.headers.authorization.split(" ")[1];
      if (!refreshToken ) {
        return res.status(403).json({ error: "Access denied,token missing!" });
      } else {
        //query for the token to check if it is valid:
        
        const tokenDoc = await userToken.findOne({ token: refreshToken });
        //send error if no token found:
        if (!tokenDoc) {
          return res.status(401).json({ error: "Token expired!" });
        } else {
          //extract payload from refresh token and generate a new access token and send it
          const payload = jwt.verify(tokenDoc.token, process.env.REFRESH_TOKEN_SECRET);
          delete payload.iat;
          delete payload.exp;
          const  accessToken = jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET,{  expiresIn: "45s",})
          return res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
})





module.exports=router