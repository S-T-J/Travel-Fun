import { useEffect, useState } from 'react';
import actions from '../api';
import NewComment from './NewComment';

function AllComments(props) {
	const [ comments, setComments ] = useState([]);
	const [ thread, setThread ] = useState({ title: '' });
	console.log(props);

	useEffect(async () => {
		let res = await actions.getAllComments(props.match.params.threadId);
		setComments(res.data.reverse());
		let threadInfo = await actions.getThreadInfo(props.match.params.threadId);
		console.log(props.match.params.threadId, threadInfo);
		setThread(threadInfo.data);
	}, []);

	useEffect(async () => {}, [ props.match.params.threadId ]);

	const upVote = async (whichCommentId, i) => {
		console.log('click', whichCommentId);
		let res = await actions.upVote(whichCommentId);
		console.log(res.data);

		let newComments = [ ...comments ];
		newComments[i] = res.data;
		setComments(newComments);
		console.log('comment', comments);
	};

	const downVote = async (whichCommentId, i) => {
		console.log('click', whichCommentId);
		let res = await actions.downVote(whichCommentId);
		console.log(res.data);

		let newComments = [ ...comments ];
		newComments[i] = res.data;
		setComments(newComments);
		console.log('comment', comments);
	};

	const ShowComments = () => {
		return comments.map((eachComment, i) => {
			return (
				<div key={eachComment._id}>
					<div className="user-section">
						<span className="user-image-section">
							{eachComment.userId && <img className="user-image" src={eachComment.userId.imageUrl} />}
						</span>
						<span className="user-name-section">{eachComment.userId && eachComment.userId.name}</span>
					</div>
					<p>{eachComment.text}</p>
					<img src={eachComment.image} />
					<div className="vote-section">
						<span className="upvote-section">
							<span>
								<img
									onClick={(e) => upVote(eachComment._id, i)}
									className="img-vote"
									src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
								/>
							</span>
							<span className="vote-count">{eachComment.upvote}</span>
						</span>
						<span className="downvote-section">
							<span>
								<img
									onClick={(e) => downVote(eachComment._id, i)}
									className="img-vote downvote"
									src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
								/>
							</span>
							<span className="vote-count">{eachComment.downvote}</span>
						</span>
					</div>
					{/* <button onClick={(e) => handleClick(eachComment._id, i)}> */}
					{/* </button> */}
					<hr />
				</div>
			);
		});
	};

	return (
		<div className="allcomments-page">
			<h2>{thread.title}</h2>
			<h3>{thread.text}</h3>
			<img src={thread.image} />
			<h2 className="allcomments-header">All Comments</h2>
			<NewComment {...props} comments={comments} setComments={setComments} />
			<ShowComments />
		</div>
	);
}

export default AllComments;
