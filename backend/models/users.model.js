const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.getSaltSync(8), null);
}
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// DO NOT USE ES6 ARROW FUNCTIONS FOR THESE METHODS!!
// userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.getSaltSync(8), null);
// userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);

const User = mongoose.model('User', userSchema);

module.exports = User;