import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Intro.css';

export default function Intro() {
    const navigate = useNavigate();
    return (
        <div className="Intro-body">
        <h1>What is Seoul Pharmacy?</h1>
        <p class="intro">This is a website looking for late-night pharmacies and foreign-speaking pharmacies around me in Korea.</p>
        <h2>Select Language</h2>
        <button onClick={() => navigate('/main')}>Start</button>
        </div>
    )
}