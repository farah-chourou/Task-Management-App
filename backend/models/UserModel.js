const mongoose = require("mongoose")
const userToken = require("./UserToken")
const jwt = require("jsonwebtoken")
const userSchema =   new mongoose.Schema({
  

    name:{
        type: String,
        required: true,
        min:3
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type:String,
        min:6
    },
    conected:{
        type: Boolean,
        default:false
    }

})



userSchema.methods ={ 
    createAccessToken: async function () {
        try {
          const  { _id, email } = this;
          const  accessToken = jwt.sign({ user: { _id, email } }, process.env.ACCESS_TOKEN_SECRET,{  expiresIn: "15s",}
          );
          return accessToken;
        } catch (error) {
          return  console.error(error);

        }
      },


      createRefreshToken: async function () {
        try {
          const  { _id, email } = this;
          const refreshToken = jwt.sign( { user: { _id, email } }, process.env.REFRESH_TOKEN_SECRET, {   expiresIn: "1d", }
          );
            await new userToken({ token: refreshToken }).save(); //whyyyyy ? 
            return refreshToken;
        } 
        catch (error) {
          console.error(error);
          return;
        }
      },
    
}

module.exports = mongoose.model( "user",userSchema)
