import { useEffect, useState } from "react";
import axios from "axios";
import actions from "../api";

const Comments = (props) => {
  let [comment, setComment] = useState("");
  let [image, setImage] = useState("");
  let [disabled, setDisabled] = useState(false);

  console.log(props, "-=-=-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await actions.createNewComment({
      text: comment,
      threadId: props.match.params.threadId,
      image,
      commentId: props.eachComment._id,
    });

    window.location.reload();
    // console.log(`Send ${comment} to api.js then routes.js then db`);

    console.log("res.data", res); //Response from backend with your new comment.{ tetxt:'b;ah', _id: '345fgdgsdg'}

    // let newComments = [ ...props.comments ]; //Copy of all previous comments on the page
    // newComments.unshift(res.data); //Push ouur new commennt into he copy
    // props.setComments(newComments); //Set to state.  Replace old list with new list so we see it wihtoutt reload
    // setComment('');
  };

  async function uploadPhoto(e) {
    setDisabled(true);
    const [file] = e.target.files;
    const reader = new FileReader();
    const formData = new FormData();
    // let file = e.target.files[0]
    console.log(typeof file, file);
    formData.append("file", file);
    formData.append("upload_preset", "zs3vfefq");
    let res = await axios.post(
      "https://iron-cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dxv7j2sj6/upload",
      formData
    );
    console.log(res.data);
    setDisabled(false);
    setImage(res.data.secure_url);
  }

  return (
    <div className="allcomments-form">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          className="replycomment-box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Comment "
        />
        <br />
        <br />
        <div className="form-control">
          <label className="form-label">
            Upload Image
            <input
              type="file"
              onChange={uploadPhoto}
              className="newthread-imageupload"
            />
          </label>
        </div>
        <div className="comments-form-control">
          <button disabled={disabled} className="allcomments-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
