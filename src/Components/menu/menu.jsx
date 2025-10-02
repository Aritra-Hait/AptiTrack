import React, { useState, useEffect, useRef } from "react";
import { getMultipleQuestions } from "../../../api.js";
import styles from "./menu.module.css";
import topics from "../../data/topic.json";
import Questions from "./questions.jsx";

function Menu() {
    const [clicked, setClicked] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const questionsRef = useRef(null);

    const handleButtonClick = (id) => {
        if (clicked === id) {
            setClicked(null);
            setSelectedTopic(null);
        } else {
            setClicked(id);
            setSelectedTopic(topics[id]);
        }
    };

    const handlePlayClick = async () => {
        if (clicked === null) return;

        setLoading(true);

        try {
            const data = await getMultipleQuestions(topics[clicked]?.url);
            setQuestions(data);

            setTimeout(() => {
                questionsRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }

        setLoading(false);
    };

    const closeQuestions = () => setQuestions([]);

    return (
        <section className={styles.menu} id="menu">
            <h2 className={styles.heading}>Choose the topic of questions</h2>
            <div className={styles.options}>
                {topics.map((topic, id) => (
                    <button
                        key={id}
                        className={`${styles.topic} ${clicked === id ? styles.clicked : ""}`}
                        onClick={() => handleButtonClick(id)}
                    >
                        {topic.name}
                    </button>
                ))}
            </div>

            <button onClick={handlePlayClick} className={styles.play} disabled={clicked === null}>
                {loading ? "Loading..." : "PLAY"}
            </button>

            {questions.length > 0 && (
                <section className={styles.questions} ref={questionsRef}>
                    <Questions questions={questions} goBack={closeQuestions} topic={selectedTopic} />
                </section>
            )}

        </section>
    );
}

export default Menu;
