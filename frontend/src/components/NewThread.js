import { useState } from 'react';
import axios from 'axios';
import actions from '../api';

function NewThread(props) {
  let [title, setTitle] = useState('');
  let [text, setText] = useState('');
  let [image, setImage] = useState('');
  let [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await actions.createNewThread({ title, text, image });
    props.history.push('/all-threads');
  };

  async function uploadPhoto(e) {
    setDisabled(true);
    const [file] = e.target.files;
    const reader = new FileReader();
    const formData = new FormData();
    // let file = e.target.files[0]
    console.log(typeof file, file);
    formData.append('file', file);
    formData.append('upload_preset', 'zs3vfefq');
    let res = await axios.post(
      'https://iron-cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dxv7j2sj6/upload',
      formData
    );
    console.log(res.data);
    setDisabled(false);
    setImage(res.data.secure_url);
  }

  return (
    <div id="new-thread" className="new-thread-div">
      <form className="new-thread-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <h1>New Thread</h1>
        </div>
        <div className="form-control">
          <label>Title:</label>
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="newthread-input"
          />
        </div>
        <div className="form-control">
          <label>Text (optional):</label>
          <textarea onChange={(e) => setText(e.target.value)} type="text" className="newthread-textarea" />
        </div>
        <div className="form-control">
          <label className="form-label">
            Upload Image
            <input type="file" onChange={uploadPhoto} className="newthread-imageupload" />
          </label>
        </div>
        <div className="form-control">
          <button disabled={disabled} className="new-thread-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewThread;
