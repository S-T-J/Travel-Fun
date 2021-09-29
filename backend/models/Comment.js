const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: String,
    upvote: {type: Number, default: 0},
    downvote: {type: Number, default: 0},
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    threadId: { type: Schema.Types.ObjectId, ref: 'Thread' }
},
    { timestamps: true }
)

module.exports = model('Comment', commentSchema);