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
    const [loadingStep, setLoadingStep] = useState(0);
    const [coldStart, setColdStart] = useState(false);

    const questionsRef = useRef(null);

    const LOADING_STEPS = [
        "Analyzing topic",
        "Balancing difficulty",
        "Generating questions",
        "Crafting Options",
        "Validating Answers",
        "Finalizing"
    ];
    useEffect(() => {
        if (!loading) return;

        setLoadingStep(0);
        const interval = setInterval(() => {
            setLoadingStep(prev =>
                prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
            );
        }, 3500);

        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        const wakeBackend = async () => {
            setColdStart(true);
            try {
                await fetch(import.meta.env.VITE_API_BASE_URL + "/api/coldStart");
            } catch (e) {
                console.warn("Backend still waking");
            }
            setColdStart(false);
        };

        wakeBackend();
    }, []);


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
            const data = await getMultipleQuestions(topics[clicked]?.name);
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
            {coldStart && (
                <div className={styles.overlay}>
                    <div className={styles.loaderBox}>
                        <h3>Waking up server</h3>
                        <p>This may take a few seconds on first load</p>
                        <div className={styles.spinner}></div>
                    </div>
                </div>
            )}

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
                {loading ? LOADING_STEPS[loadingStep] + "..." : "PLAY"}
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
