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
        <h1>New Thread</h1>
        <label>Title:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="input1"
        />
        <label>Text (optional):</label>
        <input
          onChange={(e) => setThread(e.target.value)}
          type="text"
          placeholder="Text (optional)"
          id="input2"
        />
        <button className="new-thread-button">Submit</button>
      </form>
    </div>
  );
}

export default NewThread;
