const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    }
});

module.exports = mongoose.model('user', UserSchema);