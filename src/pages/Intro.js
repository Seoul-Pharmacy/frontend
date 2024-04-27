import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ko from '../images/KoImage.png';
import en from '../images/EnImage.png';
import cn from '../images/CnImage.png';
import jp from '../images/JpImage.png';
import Footer from '../components/Footer';
import './Intro.css';

const lngs = {
    en: { nativeName: 'English' },
    ko: { nativeName: "Korean" },
    cn: { nativeName: 'Chinese' },
    jp: { nativeName: 'Japanese' },
};

export default function Intro() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    return (
        <div className="Intro-body">
            <div className="intro">
                <div className="intro-text">
                    <h1>What is PharmaSeoul?</h1>
                    <p>Guide of the location of nearby pharmacies that are currently open.</p>
                </div>
            </div>
            
            <div className="language-body">
                <h2>Select a language.</h2>
                {Object.keys(lngs).map((lng) => (
                    <button className="language" key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit">
                    </button>
                ))}
            </div>
            <Footer />
        </div>
    )
}