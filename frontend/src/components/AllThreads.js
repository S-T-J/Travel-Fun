import { useEffect, useState } from 'react';
import actions from '../api'
import { Link } from 'react-router-dom'

function AllThreads(props) {
    const [threads, setThreads] = useState([])

    useEffect(async () => {
        let res = await actions.getAllThreads()
        setThreads(res.data.reverse())
    }, [])

    const ShowThreads = () => {
        return threads.map((eachThread) => {
            return (
                <div key={eachThread._id}>
                    <Link to={`/thread/${eachThread._id}`}>
                    <h3>{eachThread.title}</h3></Link>
                    <p>{eachThread.thread}</p>
                    <hr></hr>
                </div>
            )
        })
    }

    return (
        <div>
            All Threads
            <ShowThreads />
        </div>
    );
}

export default AllThreads;