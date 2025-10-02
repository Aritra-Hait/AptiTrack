import { useState } from 'react'
import styles from './home.module.css'
import Header from '../Components/header/header.jsx'
import Menu from '../Components/menu/menu.jsx'
import { Link } from 'react-router-dom';
function Home() {

    return (
        <div>
            <Header />
            <Link to="/performanceDashboard" className={styles.link}>Performance History</Link>
            <Menu />
        </div>

    )
}

export default Home;
