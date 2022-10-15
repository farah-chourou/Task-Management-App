const mongoose = require("mongoose")
const userTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // 30 days

})

module.exports = mongoose.model("userToken" , userTokenSchema)