import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";
import styles from "./header.module.css";

function Header() {
    return (
        <nav className={styles.header} id="header">
            <div className={styles.logoContainer}>
                <a href="/" className={styles.title}>AptiTrack</a>
                <img src={getImageUrl("icon.png")} alt="Logo Icon" className={styles.icon} />
            </div>
        </nav>
    );
}

export default Header;
