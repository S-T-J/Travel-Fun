import { useEffect, useState } from 'react';
import actions from '../api'
import { Link } from 'react-router-dom'

function AllThreads(props) {
    const [threads, setThreads] = useState([])

    useEffect(async () => {
        let res = await actions.getAllThreads()
        setThreads(res.data.reverse())
    }, [])

    const upVoteThread = async (whichThreadId, i) => {
        console.log("click", whichThreadId);
        let res = await actions.upVoteThread(whichThreadId);
        console.log(res.data);

        let newThreads = [...threads];
        newThreads[i] = res.data;
        setThreads(newThreads);
        console.log("threads", threads);
    };

    const downVoteThread = async (whichThreadId, i) => {
        console.log("click", whichThreadId);
        let res = await actions.downVoteThread(whichThreadId);
        console.log(res.data);

        let newThreads = [...threads];
        newThreads[i] = res.data;
        setThreads(newThreads);
        console.log("threads", threads);
    };

    const ShowThreads = () => {
        return threads.map((eachThread, i) => {
            return (
                <div key={eachThread._id} className="allthreads-overall">
                    <div className="thread-info-section">
                        <h2>
                            <Link to={`/thread/${eachThread._id}`}>{eachThread.title}</Link>
                        </h2>
                        <p>
                            {eachThread.text}
                        </p>
                        <img src={eachThread.image} width="250" height="auto" className="allthreads-image" />
                    </div>
                    <div className="user-section">
                        <span className="user-image-section">{eachThread.userId && <img className="user-image" src={eachThread.userId.imageUrl} />}</span>
                        <span className="user-name-section">{eachThread.userId && eachThread.userId.name}</span>
                    </div>
                    <div className="vote-section">
                        <span className="upvote-section">
                            <span>
                                <img
                                    onClick={(e) => upVoteThread(eachThread._id, i)}
                                    className="img-vote"
                                    src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
                                />
                            </span>
                            <span className="vote-count">{eachThread.upvote}</span>
                        </span>
                        <span className="downvote-section">
                            <span>
                                <img
                                    onClick={(e) => downVoteThread(eachThread._id, i)}
                                    className="img-vote downvote"
                                    src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
                                />
                            </span>
                            <span className="vote-count">{eachThread.downvote}</span>
                        </span>
                    </div>
                    <hr />
                </div>
            );
        });
    };

    return (
        <div className="allthreads-title">
            <span className="allthreads-header-title">All Threads</span>
            <ShowThreads />
        </div>
    );
}

export default AllThreads;