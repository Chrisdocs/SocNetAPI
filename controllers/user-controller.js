const User = require('../models/User');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({ path: 'Thoughts', select: '-__v'})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // get user by id
    getUserById( { params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'Thoughts', select: '-__v'})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // create user
    createUser( { body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // update user
    updateUser( { params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        },
    // delete user
    deleteUser( { params }, res) {
        User.findByIdAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // add Friend
    addFriend({ params }, res) {
        // add friend to user
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbfriendData => {
            if (!dbfriendData) {
                res.status(404).json({ message: 'No user found with this userId' });
                return;
            }
            // add user to friend
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbFriendDataB => {
                if(!dbFriendDataB) {
                    res.status(404).json({ message: 'No user found with this friendId' })
                    return;
                }
                res.json(dbFriendData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // remove friend
    deleteFriend( { params }, res) {
        //remove friend from user
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbFriendData => {
            if (!dbUserData) {
                res.status(404).json( { message: 'No user found with that Id.'} )
                return;
            }
            User.findByIdAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbFriendDataB => {
                if (!dbUserDataB) {
                    res.status(404).json( { message: 'No user found with that Id.'} )
                    return;
                }
                res.json({ message: 'Friend has been removed!'})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}

}

module.exports = userController;