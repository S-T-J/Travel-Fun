import { useState } from "react";
import axios from "axios";
import actions from "../api";

function NewThread(props) {
  let [title, setTitle] = useState("");
  let [thread, setThread] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await actions.createNewThread({ title, thread });
    props.history.push("/all-threads");
  };

  return (
    <div id="new-thread" className="new-thread-div">
      <form className="new-thread-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <h1>New Thread</h1>
        </div>
        <div className="form-control">
          <label>Title:</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="newthread-input"
          />
        </div>
        <div className="form-control">
          <label>Text (optional):</label>
          <textarea
            onChange={(e) => setThread(e.target.value)}
            type="text"
            className="newthread-textarea"
          />
        </div>
        <div className="form-control">
          <button className="new-thread-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewThread;
