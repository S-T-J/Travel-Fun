import { useEffect, useState } from 'react';
import actions from '../api';

const Comments = (props) => {
	let [ comment, setComment ] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res = await actions.createNewComment({ text: comment, threadId: props.match.params.threadId });
		// console.log(`Send ${comment} to api.js then routes.js then db`);
		console.log(res);
	};

	return (
		<div>
			Comments {props.match.params.threadId}
			<form onSubmit={handleSubmit}>
				<input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Comment " />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Comments;
