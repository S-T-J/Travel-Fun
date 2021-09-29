import { useEffect, useState } from 'react';
import actions from '../api'

function AllThreads(props) {
    const [Threads, setThreads] = useState([])

    useEffect(async () => {
        let res = await actions.getAllThreads()
        setThreads(res.data.reverse())
    }, [])

    const ShowThreads = () => {
        return Threads.map((eachThread) => {
            return (
                <div key={eachThread._id}>
                    <h3>{eachThread.title}</h3>
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