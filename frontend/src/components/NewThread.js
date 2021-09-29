import { useState } from 'react';
import axios from 'axios'
import actions from '../api';

function NewThread(props) {

    let [title, setTitle] = useState('')
    let [Thread, setThread] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()
        let res = await actions.createNewThread({ title, Thread })
        props.history.push('/all-Threads')
    }


    return (
        <div>
            <label>New Thread</label>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                <input onChange={e => setThread(e.target.value)} type="text" placeholder="Thread" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default NewThread;