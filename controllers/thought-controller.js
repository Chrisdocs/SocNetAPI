const { db, remove } = require('../models/Thought');
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //get a thought by id
    getThoughtById({ params, body }, res) {
        Thought.findOne( { _id: params.id })
            .populate({ path: 'user', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No user found with that ID.'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },


    // create a thought

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: dbThoughtData._id}},
                    { new: true }
                );
    }).then((dbUserData) => {
        if(!dbUserData){
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({message: 'thought succesfully created'});
    }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
        },


    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id }, body, 
            { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No user found with that ID.'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },


    // delete a thought by id
    deleteThought({
        params
    }, res) {
        Thought.findByIdAndDelete({
                _id: params.id
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No user found with that ID.'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create a reaction stored in the thoughts models reations array
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } }, 
            { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thought found with that Id.'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // delete a reaction from the  thought models reation array
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
}

module.exports = thoughtController;