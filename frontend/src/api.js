import axios from 'axios';

let SERVER_URL =
	process.env.NODE_ENV === 'development'
		? `http://localhost:5000/api`
		: `https://travel-bug-ironhack.herokuapp.com/api`;

const createHeader = () => {
	//Sends my token to the backend
	return {
		headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
	};
};

//THIS IS WHERE WE CONNECT TO THE BACKEND >> OUR FRONT END ROUTES
const actions = {
	getAllPosts: async () => {
		return await axios.get(`${SERVER_URL}/all-posts`, createHeader());
	},
	getTopThreads: async () => {
		return await axios.get(`${SERVER_URL}/top-threads`, createHeader());
	},
	getThreadInfo: async (threadId) => {
		return await axios.get(`${SERVER_URL}/thread/${threadId}`, createHeader());
	},
	getAllThreads: async () => {
		return await axios.get(`${SERVER_URL}/all-threads`, createHeader());
	},
	getAllComments: async (threadId) => {
		console.log(threadId);
		return await axios.get(`${SERVER_URL}/all-comments/${threadId}`, createHeader());
	},
	createNewPost: async ({ title, post }) => {
		return await axios.post(`${SERVER_URL}/new-post`, { title, post }, createHeader());
	},
	createNewThread: async ({ title, text, image }) => {
		return await axios.post(`${SERVER_URL}/new-thread`, { title, text, image }, createHeader());
	},

	createNewComment: async ({ text, threadId, image }) => {
		console.log(text, threadId, image);
		return await axios.post(`${SERVER_URL}/new-comment`, { text, threadId, image }, createHeader());
	},

	upVote: async (commentId) => {
		return await axios.post(`${SERVER_URL}/upvote`, { commentId }, createHeader());
	},

	downVote: async (commentId) => {
		return await axios.post(`${SERVER_URL}/downvote`, { commentId }, createHeader());
	},

	upVoteThread: async (threadId) => {
		return await axios.post(`${SERVER_URL}/upvote-thread`, { threadId }, createHeader());
	},

	downVoteThread: async (threadId) => {
		return await axios.post(`${SERVER_URL}/downvote-thread`, { threadId }, createHeader());
	},

	authenticate: async (user) => {
		let res = await axios.post(`${SERVER_URL}/authenticate`, user);
		localStorage.setItem('token', res.data.token);
	},
	getUser: async () => {
		return await axios.get(`${SERVER_URL}/get-user`, createHeader());
	}
};

export default actions;
