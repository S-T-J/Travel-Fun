import { useEffect, useState } from 'react';

const Comments = (props) => {
	let [ comment, setComment ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`Send ${comment} to api.js then routes.js then db`);
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
