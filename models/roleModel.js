const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('role', RoleSchema);