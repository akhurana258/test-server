const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {
        type : String
    },
    last_name: {
        type: String
    },
    email: {
        type : String,
    },
    phone_number: {
        type: Number
    },
    profile_image : {
        type: String
    }
});
 
const User = new mongoose.model('users', userSchema);
module.exports = User;