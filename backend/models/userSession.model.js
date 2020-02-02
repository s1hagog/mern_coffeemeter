const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: String,
        required: true,
        default: '-1',
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
})

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;