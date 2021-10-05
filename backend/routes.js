const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Thread = require('./models/Thread');
const Comment = require('./models/Comment');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

//http://localhost:5000/api/all-posts GET
router.get('/all-posts', async (req, res) => {
	let allPosts = await Post.find();
	res.json(allPosts);
});

//http://localhost:5000/api/all-threads GET
router.get('/all-threads', async (req, res) => {
	let allThread = await Thread.find().populate('userId');
	res.json(allThread);
});

//http://localhost:5000/api/top-threads GET
router.get('/top-threads', async (req, res) => {
	let topThreads = await Thread.find().sort({ upvote: -1 }).sort({ downvote: 1 }).limit(5).populate('userId');
	res.json(topThreads);
});

//http://localhost:5000/api/all-comments/:threadId GET
// router.get('/all-comments/:threadId', async (req, res) => {
// 	let allComment = await Comment.find({ threadId: req.params.threadId }).populate('userId');
// 	console.log(allComment);
// 	res.json(allComment);
// });

router.get('/all-comments/:threadId', async (req, res) => {
	//let allComments = await Comment.find({ threadId: req.params.threadId }).populate('userId');

	// function createNest(commentId) {
	// 	console.log(commentId);
	// 	let replies = allComments.filter((eachComment) => eachComment.commentId.equals(commentId));
	// 	console.log(replies, 'replies');
	// 	if (replies.length > 0) {
	// 		for (let reply of replies) {
	// 			createNest(reply._id);
	// 		}
	// 	}
	// }

	// createNest(null);

	// let total = await Comment.find({ threadId: req.params.threadId }).count();

	// let allComments = { replies: [] };
	// let totalReplies = 0;
	// async function findReplies(commentId) {
	// 	console.log(commentId, '?');
	// 	let replies = await Comment.find({ threadId: req.params.threadId, commentId: commentId }).populate('userId');
	// 	console.log(replies.length);
	// 	if (replies.length > 0) {
	// 		if (commentId) {
	// 			allComments['replies'].find((comment) => comment._id === commentId)['replies'].push(replies); //This is where we are screwing up
	// 		} else {
	// 			allComments['replies'].push(replies);
	// 		}
	// 		console.log(replies.length);
	// 		for (let reply of replies) {
	// 			findReplies(reply._id);
	// 			totalReplies++;
	// 		}
	// 	} else if (totalReplies >= total) {
	// 		console.log(allComments, '!', totalReplies, total);
	// 		return res.json(allComments);
	// 	}
	// }
	// findReplies(null);
	// let obj = {
	//   _id: '1324124',
	//   replies: [{
	//     _id: 'ererer',
	//     replies : [],
	//   },
	//   ]
	// };
	// for (let comment of allComments) {
	// }

	/**** */

	let allComment = await Comment.find({ threadId: req.params.threadId }).populate('userId');
	console.log(allComment);
	res.json(allComment);
});

//http://localhost:5000/api//thread/:threadId GET
router.get('/thread/:threadId', async (req, res) => {
	const thread = await Thread.findOne({ _id: req.params.threadId });
	console.log(thread);
	res.json(thread);
});

router.post('/new-comment', authorize, async (req, res) => {
	console.log(req.body, 'watermelon');
	let newComment = req.body;
	newComment.userId = res.locals.user._id;
	let comment = await Comment.create(newComment);
	comment.populate('userId');
	let user = await User.findById(comment.userId);
	console.log('user', user);
	let finalComment = { ...comment._doc, users: [ user ] };
	console.log(finalComment);
	res.json(finalComment);
});

//http://localhost:5000/api/new-post POST
router.post('/new-post', authorize, async (req, res) => {
	//Everyime you put authorize as middleware you'll have the user as res.locals.user
	let newPost = req.body;
	newPost.userId = res.locals.user._id; //How we add the userId to the post document
	let post = await Post.create(newPost);
	res.json(post);
});

router.post('/new-thread', authorize, async (req, res) => {
	//Everyime you put authorize as middleware you'll have the user as res.locals.user
	let newThread = req.body;
	newThread.userId = res.locals.user._id; //How we add the userId to the post document
	let thread = await Thread.create(newThread);
	let newComment = await Comment.create({ text: thread.title, threadId: thread._id });
	res.json(thread);
});

router.get('/get-user', authorize, async (req, res) => {
	let user = await User.findById(res.locals.user._id);
	res.json(user);
});

router.post('/upvote', authorize, async (req, res) => {
	// console.log('did i  hit this!?', req.body, req.body.commentId, '???');
	let updatedUpvote = await Comment.findByIdAndUpdate(
		req.body.commentId,
		{ $inc: { upvote: 1 } },
		{ new: true }
	).populate('userId');
	console.log(updatedUpvote);
	res.json(updatedUpvote);
});

router.post('/downvote', authorize, async (req, res) => {
	// console.log('did i  hit this!?', req.body, req.body.commentId, '???');
	let updatedDownvote = await Comment.findByIdAndUpdate(
		req.body.commentId,
		{ $inc: { downvote: 1 } },
		{ new: true }
	).populate('userId');
	console.log(updatedDownvote);
	res.json(updatedDownvote);
});

router.post('/upvote-thread', authorize, async (req, res) => {
	// console.log('did i  hit this!?', req.body, req.body.commentId, '???');
	let updatedUpvote = await Thread.findByIdAndUpdate(
		req.body.threadId,
		{ $inc: { upvote: 1 } },
		{ new: true }
	).populate('userId');
	console.log(updatedUpvote);
	res.json(updatedUpvote);
});

router.post('/downvote-thread', authorize, async (req, res) => {
	// console.log('did i  hit this!?', req.body, req.body.commentId, '???');
	let updatedDownvote = await Thread.findByIdAndUpdate(
		req.body.threadId,
		{ $inc: { downvote: 1 } },
		{ new: true }
	).populate('userId');
	console.log(updatedDownvote);
	res.json(updatedDownvote);
});

router.post('/authenticate', async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		//if the user is not in database create them
		user = await User.create(req.body);
	}
	jwt.sign({ user }, 'secret key', { expiresIn: '99980min' }, (err, token) => {
		res.json({ user, token });
	});
});

//Middleware >>> Put this in the middle of any route where you want to authorize
function authorize(req, res, next) {
	let token = req.headers.authorization.split(' ')[1]; //Token from front end
	if (token) {
		jwt.verify(token, 'secret key', (err, data) => {
			if (!err) {
				res.locals.user = data.user; //Set global variable with user data in the backend
				next();
			} else {
				res.status(403).json({ message: err });
				//throw new Error({ message: "ahhh" })
			}
		});
	} else {
		res.status(403).json({ message: 'Must be logged in!' });
	}
}

module.exports = router;
