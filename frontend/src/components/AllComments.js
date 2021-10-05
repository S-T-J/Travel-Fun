import { useEffect, useState } from 'react';
import actions from '../api';
import NewComment from './NewComment';
import EachComment from './EachComment';

function AllComments(props) {
	const [ comments, setComments ] = useState([]);
	const [ thread, setThread ] = useState({ title: '' });

	useEffect(async () => {
		let res = await actions.getAllComments(props.match.params.threadId);
		setComments(res.data.reverse());
		console.log(res.data, 'this.one')
		let threadInfo = await actions.getThreadInfo(props.match.params.threadId);
		console.log(props.match.params.threadId, threadInfo);
		setThread(threadInfo.data);
	}, []);

	//useEffect(async () => {}, [ props.match.params.threadId ]);

	const ShowComments = (props) => {
		return comments.map((eachComment, i) => {
			return (
				<EachComment
					eachComment={eachComment}
					i={i}
					setComments={setComments}
					comments={comments}
					key={eachComment._id}
					{...props}
				/>
			);
		});
	};

	return (
		<div className="allcomments-page">
			<h2>{thread?.title}</h2>
			<h3>{thread?.text}</h3>
			<img src={thread?.image} width="250" height="auto" />
			<p className="allcomments-header">Comments</p>
			<div className="allcomments-setcomments">
				{/* <NewComment {...props} comments={comments} setComments={setComments} /> */}
				<ShowComments {...props} />
			</div>
		</div>
	);
}

export default AllComments;
