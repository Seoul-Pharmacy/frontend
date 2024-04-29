import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import koImg from '../images/IntroPage/KoImage.png';
import enImg from '../images/IntroPage/EnImage.png';
import cnImg from '../images/IntroPage/CnImage.png';
import jpImg from '../images/IntroPage/JpImage.png';
import Footer from '../components/Footer';
import './Intro.css';

const lngs = {
    en: { nativeName: 'English', imageName: enImg},
    ko: { nativeName: 'Korean', imageName: koImg},
    cn: { nativeName: 'Chinese', imageName: cnImg},
    jp: { nativeName: 'Japanese', imageName: jpImg},
};

export default function Intro() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    return (
        <div className="intro-wrapper">
            <div className="intro">
                <div className="intro-text">
                    <h1>What is PharmaSeoul?</h1>
                    <p>Guide of the location of nearby pharmacies that are currently open.</p>
                </div>
            </div>
            
            <div className="language-body">
                <h2>Select a language.</h2>
                {Object.keys(lngs).map((lng) => (
                    <button
                        className="intro-lan-button" key={lng}
                        type="submit"
                        style={{
                            backgroundImage: `url(${lngs[lng].imageName})`
                        }}
                        onClick={() => {
                            i18n.changeLanguage(lng);
                            navigate('/main');
                        }}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
            <Footer />
        </div>
    )
}