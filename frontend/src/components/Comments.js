import React from 'react';

const Comments = (props) => {
    return (
        <div>
            Comments {props.match.params.threadId}
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                <input onChange={e => setThread(e.target.value)} type="text" placeholder="Thread" />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Comments;