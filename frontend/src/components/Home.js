import React, { useState, useEffect } from 'react';
import actions from '../api';
import { Link } from 'react-router-dom';
// import './index.css';

const Home = () => {
    let [topThreads, setTopThreads] = useState([])

    useEffect(async () => {
        const res = await actions.getTopThreads()
        setTopThreads(res.data)
    }, [])

    const ShowTopThreads = () => topThreads.map((eachThread) => {
        return (
            <div key={eachThread._id}>
                <div className="thread-info-section">
                    <h2>
                        <Link to={`/thread/${eachThread._id}`}>{eachThread.title}</Link>
                    </h2>
                </div>
                <div className="user-section">
                    <span className="user-image-section">{eachThread.userId && <img className="user-image" src={eachThread.userId.imageUrl} />}</span>
                    <span className="user-name-section">{eachThread.userId && eachThread.userId.name}</span>
                </div>
                <p>{eachThread.text}</p>
                <div className="vote-section">
                    <span className="upvote-section">
                        <span>
                            <img
                                // onClick={(e) => upVoteThread(eachThread._id, i)}
                                className="img-vote"
                                src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
                            />
                        </span>
                        <span className="vote-count">{eachThread.upvote}</span>
                    </span>
                    <span className="downvote-section">
                        <span>
                            <img
                                // onClick={(e) => downVoteThread(eachThread._id, i)}
                                className="img-vote downvote"
                                src="https://www.vippng.com/png/full/116-1160623_up-arrow-png-up-arrow-png-white.png"
                            />
                        </span>
                        <span className="vote-count">{eachThread.downvote}</span>
                    </span>
                </div>
                <hr />
            </div>
        )
    })

    return (
        <>
            <div className="home-headerimage">
            </div>
            <div className="home-showtopthreads">
                <h2 className="home-topfivetitle">Top 5 Threads:</h2>
                <ShowTopThreads />
            </div>
        </>
    );
}

export default Home;