const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
    title: String,
    thread: String,
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    { timestamps: true }
)

module.exports = model('Thread', threadSchema);