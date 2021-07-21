const { Schema, model, Types} = require('mongoose');
const { DateTime } = require('luxon');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: DateTime.now,
        get: createdAtVal => new DateTime(createdAtVal).toLocaleString(DateTime.DATETIME_MED)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
}
);

module.exports = ReactionSchema;