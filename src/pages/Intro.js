import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
            <h1>What is Seoul Pharmacy?</h1>
            <p class="intro">This is a website looking for late-night pharmacies and foreign-speaking pharmacies around me in Korea.</p>
            <h2>Select Language</h2>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
                        i18n.changeLanguage(lng);
                        navigate('/main');
                    }}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
        </div>
    )
}