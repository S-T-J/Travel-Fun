import { useState, useEffect } from "react";
import axios from "axios";
import actions from "../api";
import NewComment from "./NewComment";

function EachComment(props) {
  let { eachComment, i, comments, setComments } = props;
  let [reply, setReply] = useState(false);

  const upVote = async (whichCommentId, i) => {
    let res = await actions.upVote(whichCommentId);

    let newComments = [...comments];
    newComments[i] = res.data;
    setComments(newComments);
  };

  const downVote = async (whichCommentId, i) => {
    let res = await actions.downVote(whichCommentId);

    let newComments = [...comments];
    newComments[i] = res.data;
    setComments(newComments);
  };

  return (
    <div>
      <div className="user-section">
        <span className="user-image-section">
          {eachComment.userId && (
            <img className="user-image" src={eachComment.userId.imageUrl} />
          )}
        </span>
        <span className="user-name-section">
          {eachComment.userId && eachComment.userId.name}
        </span>
      </div>
      {/* <p>{eachComment.text}</p> */}
      <img src={eachComment.image} width="250" height="auto" />
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
      <div className="reply-button">
        <button onClick={(e) => setReply(!reply)}>Reply</button>
        {reply && <NewComment eachComment={eachComment} {...props} />}
      </div>
      <hr />
    </div>
  );
}

export default EachComment;
