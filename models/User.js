const { Schema, model } = require('mongoose');
const ThoughtSchema = require('./Thought')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "You must provide a username.",
        trime: true
    },
    email: {
        type: String,
        required: "You must provide an email address.",
        unique: true,
        match: [/.+@.+\..+/]
    },
    // thoughts: [ThoughtSchema],
    // friends: [UserSchema]
})

// FriendSchema.virtual('friendCount').get(function() {
//     return this.friends.length;
// })

const User = model('User', UserSchema);

module.exports = User;