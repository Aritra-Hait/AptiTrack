import React, { useState, useRef, useEffect } from "react";
import styles from './questions.module.css';
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";

function Questions({ questions, goBack, topic }) {
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
    const [score, setScore] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const resultRef = useRef(null);
    const handleOptionClick = (questionIndex, option) => {
        const newSelections = [...selectedOptions];
        newSelections[questionIndex] = option;
        setSelectedOptions(newSelections);
    };
    const intervalRef = useRef(null);

    useEffect(() => {
        setSeconds(0);
        intervalRef.current = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [questions]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const handleSubmit = () => {
        clearInterval(intervalRef.current);

        let finalScore = 0;
        questions.forEach((q, index) => {
            if (selectedOptions[index] === q.answer) {
                finalScore++;
            }
        });

        setScore(finalScore);

        let history = JSON.parse(localStorage.getItem("performanceHistory")) || [];

        const attempt = {
            topic: topic?.name || "Unknown",
            score: finalScore,
            total: questions.length,
            timeTaken: seconds,
            date: formatDate(new Date())
        };

        history.unshift(attempt);
        // console.log(history);
        localStorage.setItem("performanceHistory", JSON.stringify(history));

        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    const handleBackClick = () => {
        setTimeout(goBack, 1000);
    };

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')} minutes ${seconds.toString().padStart(2, '0')} seconds`;
    };

    return (
        <div className={styles.container}>

            <div className={styles.time}>
                <h3 className={styles.timer}>Time :  {formatTime(seconds)}</h3>
                <img src={getImageUrl("stopwatch.png")} alt="Stopwatch" className={styles.icon} />
            </div>
            <h2 className={styles.heading}>Questions</h2>
            <ul className={styles.list}>
                {questions.map((q, index) => (
                    <li className={styles.quest} key={index}>
                        <div>Question {index + 1}: {q.question}</div>
                        <div className={styles.options}>
                            {q.options.map((option, id) => (
                                <button
                                    key={id}
                                    className={styles.eachOption}
                                    onClick={() => handleOptionClick(index, option)}
                                    style={{
                                        backgroundColor: selectedOptions[index] === option ? "#d9e017" : "", color: selectedOptions[index] === option ? "black" : ""
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>

            <button className={styles.submit} onClick={handleSubmit}>Submit</button>

            {
                score != null && <section className={styles.result} ref={resultRef}>
                    <div className={styles.resultContainer}>
                        <a href="#header" onClick={handleBackClick} className={styles.back}>Back to Menu</a>

                        <div className={styles.resultRight}>
                            <div className={styles.score}>Final Score : {score}/{questions.length}</div>
                            <div className={styles.timeTaken}>Time Taken : {formatTime(seconds)}</div>
                        </div>
                    </div>

                    <h2 className={styles.heading}>Answers and Explanation</h2>
                    <ul className={styles.explanation}>

                        {questions.map((q, index) => (
                            <li className={styles.quest} key={index}>
                                <div>Question {index + 1} : {q.question}</div>
                                <div className={styles.ans}>
                                    Correct Answer :  {q.answer} <br /> Explanation : {q.explanation}</div>
                            </li>
                        ))}
                    </ul>
                    <div id="end" className={styles.end}>
                        <a href="#header" onClick={handleBackClick} className={styles.back}>Back to Menu</a>
                        <Link to="/performanceDashboard" className={styles.link}>View Performance History</Link>
                    </div>


                </section>
            }
        </div >
    );
}

export default Questions;
