const mongooe = require('mongoose');

const userSchema = new mongooe.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const user = new mongooe.model('user', userSchema);

module.exports = user;
