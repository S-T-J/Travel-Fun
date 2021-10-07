import { useEffect, useState } from "react";
import actions from "../api";
import NewComment from "./NewComment";
import EachComment from "./EachComment";
import EachReply from "./EachReply";

function AllComments(props) {
  const [comments, setComments] = useState([]);
  const [thread, setThread] = useState({ title: "" });
  const [replies, setReplies] = useState([]);

  useEffect(async () => {
    let res = await actions.getAllComments(props.match.params.threadId);
    setComments(res.data.reverse());
    console.log(res.data, "this.one");
    let threadInfo = await actions.getThreadInfo(props.match.params.threadId);
    console.log(props.match.params.threadId, threadInfo);
    setThread(threadInfo.data);
    inception(res.data.reverse());
  }, []);

  const inception = (comments) => {
    console.log(comments);
    let depth = 0;

    function findReplies(commentId, obj) {
      let replies = comments.filter(
        (eachComment) => eachComment.commentId == commentId
      );
      obj["replies"] = replies;

      for (let reply of replies) {
        findReplies(reply._id, reply);
        depth++;
      }
      //
      if (depth == comments.length) {
        console.log(obj, "...");
        setReplies(obj.replies);
        //   console.log(JSON.stringify(obj))
      }
    }

    findReplies(null, { name: "first" });
  };

  // const ShowReplies = () => {
  // 	let all = []
  // 	replies.map(each => {
  // 		all.push(<div>{each.text}</div>)
  // 		return each.replies.map(each => {
  // 			all.push( <div>{each.text}</div> )

  // 		})
  // 	})
  // 	return all
  // }

  const ShowReplies = () => {
    let all = [];
    console.log(replies);
    function digDeeper(num, replies) {
      num++;
      for (let each of replies) {
        all.push(
          <>
            <div
              style={{ marginLeft: num * 50 + "px", marginTop: num * 0 + "px" }}
            >
              {each.text}

              <EachReply
                inception={inception}
                eachComment={each}
                comments={comments}
                setComments={setComments}
                key={each._id}
                {...props}
              />

              {num % 2 === 0 ? (
                <vr style={{ backgroundColor: "white" }}></vr>
              ) : (
                <vr style={{ backgroundColor: "#eceeef" }}></vr>
              )}
            </div>
          </>
        );
        // console.log(each, num);
        if (each.replies.length > 0) {
          digDeeper(num, each.replies);
        }
      }
    }

    digDeeper(0, replies);
    console.log("is this called", all, replies);
    return all;
  };

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
        {/* <ShowComments {...props} /> */}
        <ShowReplies {...props} />
      </div>
    </div>
  );
}

export default AllComments;
