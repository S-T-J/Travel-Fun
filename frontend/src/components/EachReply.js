import { useState, useEffect } from "react";
import axios from "axios";
import actions from "../api";
import NewComment from "./NewComment";

function EachComment(props) {
  let { eachComment, i, comments, setComments, inception } = props;
  let [reply, setReply] = useState(false);

  const upVote = async (whichCommentId) => {
    let res = await actions.upVote(whichCommentId);

    let newComments = [...comments];

    for (let i = 0; i < newComments.length; i++) {
      if (newComments[i]._id == whichCommentId) {
        newComments[i] = res.data;
      }
    }
    // newComments.push(res.data);
    //newComments.find(comment => comment._id)
    props.inception(newComments);
    // window.location.reload();
    // newComments[i] = res.data;
    // setComments(newComments);
  };

  const downVote = async (whichCommentId, i) => {
    let res = await actions.downVote(whichCommentId);

    // let newComments = [...comments];
    let newComments = [...comments];

    for (let i = 0; i < newComments.length; i++) {
      if (newComments[i]._id == whichCommentId) {
        newComments[i] = res.data;
      }
    }
    props.inception(newComments);
    // newComments.push(res.data);
    //newComments.find(comment => co
    // newComments[i] = res.data;
    // setComments(newComments);
  };

  return (
    <div>
      {/* <p>{eachComment.text}</p> */}
      <img src={eachComment.image} width="250" height="auto" />
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
      <div className="vote-section">
        <span className="upvote-section">
          <span>
            <img
              onClick={(e) => upVote(eachComment._id)}
              className="img-vote"
              src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
            />
          </span>
          <span className="vote-count">{eachComment.upvote}</span>
        </span>
        <span className="downvote-section">
          <span>
            <img
              onClick={(e) => downVote(eachComment._id)}
              className="img-vote downvote"
              src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
            />
          </span>
          <span className="vote-count">{eachComment.downvote}</span>
        </span>
      </div>
      <div className="reply-button">
        <button className="reply-buttontwo" onClick={(e) => setReply(!reply)}>
          Reply
        </button>
        <div className="eachreply-comment">
          {reply && (
            <NewComment
              comments={comments}
              setComments={setComments}
              inception={inception}
              eachComment={eachComment}
              {...props}
            />
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default EachComment;
