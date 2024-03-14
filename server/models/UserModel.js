const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    image: {
        originalFilename: String,
    },

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
