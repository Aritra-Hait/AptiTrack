import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './dashboard.module.css'
import { ArrowLeftIcon } from 'lucide-react'

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("performanceHistory")) || [];
        setHistory(data);
    }, []);

    return (
        <div className={styles.dashboard}>
            <Link to="/"><ArrowLeftIcon color='white' size={35} /></Link>
            <div className={styles.historyContainer}>
                <h1>Performance History Dashboard</h1>

                {history.length === 0 ? (
                    <p>No history available.</p>
                ) : (
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th>Attempted On</th>
                                <th>Topic</th>
                                <th>Score</th>
                                <th>Time Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.topic}</td>
                                    <td>{entry.score}/{entry.total}</td>
                                    <td>
                                        {Math.floor(entry.timeTaken / 60)} mins {entry.timeTaken % 60} secs
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Dashboard
