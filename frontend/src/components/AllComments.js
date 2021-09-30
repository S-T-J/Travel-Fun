import { useEffect, useState } from 'react';
import actions from '../api';
import NewComment from './NewComment';

function AllComments(props) {
	const [ comments, setComments ] = useState([]);
	console.log(props);
	useEffect(async () => {
		let res = await actions.getAllComments(props.match.params.threadId);
		setComments(res.data.reverse());
	}, []);

	const handleClick = async (whichCommentId, i) => {
		console.log('click', whichCommentId);
		let res = await actions.upVote(whichCommentId);
		console.log(res.data);
		let newComments = [ ...comments ];
		newComments[i] = res.data;
		setComments(newComments);
	};

	const ShowComments = () => {
		return comments.map((eachComment, i) => {
			return (
				<div key={eachComment._id}>
					<h2>{eachComment.upvote}</h2>
					<h3>{eachComment.user}</h3>
					<p>{eachComment.text}</p>
					{/* <button onClick={(e) => handleClick(eachComment._id, i)}> */}
					<img
						onClick={(e) => handleClick(eachComment._id, i)}
						className="img-upvote"
						src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
					/>
					{/* </button> */}
					<hr />
				</div>
			);
		});
	};

	return (
		<div>
			All Comments
			<NewComment {...props} comments={comments} setComments={setComments} />
			<ShowComments />
		</div>
	);
}

export default AllComments;
