import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nearbyApi from '../../api/nearbyApi';
import './NearbySearch.css';

import Header from "../../components/header/Header";
import SearchDesign from "../../components/SearchDesgin";
import Footer from "../../components/footer/Footer";
import NearbyResult from "../../components/result/NearbyResult";

import Language from '../../images/NearbySearchPage/languageIcon.png';
import { Button } from "react-bootstrap";

const languages = {
    japanese: '日本語',
    chinese: '中国人',
    english: 'English'
};

export default function NearbySearch() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(true);
    const [languageState, setLanguageState] = useState({
        japanese: false,
        chinese: false,
        english: false
    });
    const [pharmacies, setPharmacies] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const lat = query.get('lat');
    const lng = query.get('lng');
    const location = { lat, lng };

    function fetchPharmacies(language, isOpen) {
        if (lat && lng) {
            nearbyApi(language.japanese, language.chinese, language.english , location, isOpen)
                .then(data => {
                    const results = data?.results || [];
                    setPharmacies(results);
                }).catch(error => {
                    console.error('Failed to fetch pharmacies:', error);
                    if (error.message === '404') {
                        alert('404: ' + t('no-pharmacies-match'));
                    } else {
                        alert(`Error: ${error.message}`);
                    }
                });
        }
    };

    useEffect(() => {
        fetchPharmacies(languageState, isOpen);
    }, []);

    const handleOpenChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleLanguageChange = (language) => {
        setLanguageState((prevState) => ({
            ...prevState,
            [language]: !prevState[language]
        }));
    };

    return (
        <>
            <Header />
            <SearchDesign>{t('based-on-location')}</SearchDesign>
            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">{t('nearby-result-explanation-text1')}</p>
                    <h1 id="result-explanation-inner-text2">{t('nearby-result-explanation-text2')}</h1>
                </div>
                <div id="search-inner-wrapper">
                    <div id="search-condition-wrapper">
                        <div id="present-checkbox-wrapper">
                            <input type="checkbox" id="chk1"
                                   name="present"
                                   checked={isOpen}
                                   onChange={handleOpenChange}/><label id="present-checkbox-label" htmlFor="chk1"></label>

                            <label id='present-checkbox-name' htmlFor="chk1">{t('search-only-open')}</label>
                        </div>

                        <h3 id="language-choice-text"><img id="language-icon" src={Language} alt=""/>{t('language')}</h3>
                        <div id="language-checkbox-wrapper">
                            {Object.entries(languages).map(([key, name]) => (
                                <React.Fragment key={key}>
                                    <input
                                        id={`speaking-${key}`}
                                        className = "language-checkbox-item"
                                        type="checkbox"
                                        checked={languageState[key]}
                                        onChange={() => handleLanguageChange(key)}
                                    />
                                    <label
                                        id={`speaking-${key}-label`}
                                        className="language-checkbox"
                                        htmlFor={`speaking-${key}`}>
                                        {name}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        id="pharmacy-search-button"
                        onClick={() => fetchPharmacies(languageState, isOpen)}
                    >
                        {t('search')}
                    </Button>{' '}
                </div>
            </div>
            <NearbyResult result={pharmacies}/>
            <Footer/>
        </>
    )
}