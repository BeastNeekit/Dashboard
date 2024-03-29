// models/AdminModel.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    lastLogin: {
        type: Date,
        default: null,
    },
    profilePictures: String,
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
