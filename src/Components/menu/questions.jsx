import React, { useState, useRef } from "react";
import styles from './questions.module.css';

function Questions({ questions }) {
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
    const [score, setScore] = useState(null)
    const resultRef = useRef(null);
    const handleOptionClick = (questionIndex, option) => {
        const newSelections = [...selectedOptions];
        newSelections[questionIndex] = option;
        setSelectedOptions(newSelections);
    };

    const handleSubmit = () => {
        let finalScore = 0;
        questions.forEach((q, index) => {
            if (selectedOptions[index] === q.answer) {
                finalScore++;
            }
        });
        setScore(finalScore);

        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

    };

    return (
        <div className={styles.container}>
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

            {score !== null && <section className={styles.result} ref={resultRef}>
                <div className={styles.resultContainer}>
                    <a href="#header" className={styles.back}>Back to Menu</a>
                    <div className={styles.score}>Final Score : {score}/{questions.length}</div>
                </div>
                <h2 className={styles.heading}>Answers and Explanation</h2>
                <ul className={styles.explanation}>

                    {questions.map((q, index) => (
                        <li className={styles.quest} key={index}>
                            <div>Question {index + 1} :</div>
                            <div className={styles.ans}>
                                Correct Answer :  {q.answer} <br /> Explanation : {q.explanation}</div>
                        </li>
                    ))}
                </ul>
                <div id="end" className={styles.end}>
                    <a href="#header" className={styles.back}>Back to Menu</a>
                </div>


            </section>}
        </div >
    );
}

export default Questions;
