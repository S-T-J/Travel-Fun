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
	createNewThread: async ({ title, thread }) => {
		return await axios.post(`${SERVER_URL}/new-thread`, { title, thread }, createHeader());
	},

	createNewComment: async ({ text, threadId }) => {
		console.log(text, threadId);
		return await axios.post(`${SERVER_URL}/new-comment`, { text, threadId }, createHeader());
	},

	upVote: async (commentId) => {
		return await axios.post(`${SERVER_URL}/upvote`, { commentId }, createHeader());
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
