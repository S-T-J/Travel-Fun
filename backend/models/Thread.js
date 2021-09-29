const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
    title: String,
    thread: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    { timestamps: true }
)

module.exports = model('Thread', threadSchema);