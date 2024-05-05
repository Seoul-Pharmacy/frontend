import React, { useState, useEffect } from "react";
import useIsOpen from '../Hooks/useIsOpen';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nearbyApi from '../api/nearbyApi';
import './NearbySearch.css';

import Header from "../components/Header";
import SearchDesign from "../components/SearchDesgin";
import Footer from "../components/Footer";
import NearbyResult from "../components/result/NearbyResult";

import Arrow from '../images/NearbySearchPage/dropDownArrow.png';
import Time from '../images/NearbySearchPage/timeIcon.png';
import Language from '../images/NearbySearchPage/languageIcon.png';
import {Button, Dropdown} from "react-bootstrap";

export default function NearbySearch() {
    const {t} = useTranslation();
    const [isOpen, toggleOpen] = useIsOpen();
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

    function fetchPharmacies(language) {
        if (lat && lng) {
            nearbyApi(language.japanese, language.chinese, language.english , location, isOpen)
                .then(data => {
                    setPharmacies(data.results || []);
                }).catch(error => {
                    console.error("Failed to fetch pharmacies:", error);
                });
        }
    };

    useEffect(() => {
        fetchPharmacies(languageState);
    }, [lat, lng]);

    const [time, setTime] = useState("전체");
    const clickTimeDropdown = (event) => {
        let time = event.target.textContent;
        setTime(time);
        document.getElementById('time-value').innerText = time;
    };

    const handleCheckboxChange = (language) => {
        setLanguageState((prevState) => ({
            ...prevState,
            [language]: !prevState[language]
        }));
    };

    return (
        <>
            <Header />
            <SearchDesign>{t('description.based-on-location')}</SearchDesign>
            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">{t('description.result-explanation-text1')}</p>
                    <h1 id="result-explanation-inner-text2">{t('description.result-explanation-text2')}</h1>
                </div>
                <div id="search-inner-wrapper">
                    <div id="search-condition-wrapper">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-select">
                                <img className="location-icon" src={Time} alt=""/>
                                영업시간
                                <div id="time-value">전체</div>
                                <img className="arrow-icon" src={Arrow} alt=""/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>Action</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>Another action</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <h3 id="language-choice-text"><img id="language-icon" src={Language} alt=""/>가능한 언어 선택(복수)</h3>
                        <div id="language-checkbox-wrapper">
                        <input
                            id="speaking-japanese"
                            type="checkbox"
                            checked={languageState.japanese}
                            onChange={() => handleCheckboxChange('japanese')}
                        />
                        <label
                            id="speaking-japanese-label"
                            className="language-checkbox"
                            htmlFor="speaking-japanese">
                                日本語
                        </label>
                        <input
                            id="speaking-chinese"
                            type="checkbox"
                            checked={languageState.chinese}
                            onChange={() => handleCheckboxChange('chinese')}
                        />
                        <label
                            id="speaking-chinese-label" className="language-checkbox" htmlFor="speaking-chinese">
                                中国人
                        </label>
                        <input
                            id="speaking-english"
                            type="checkbox"
                            checked={languageState.english}
                            onChange={() => handleCheckboxChange('english')}
                        />
                            <label
                                id="speaking-english-label"
                                className="language-checkbox"
                                htmlFor="speaking-english">
                                    english
                            </label>
                    </div>
                </div>

                <Button
                    variant="primary"
                    id="pharmacy-search-button"
                    onClick={() => fetchPharmacies(languageState)}
                >
                    검색
                </Button>{' '}
                </div>
            </div>
            <NearbyResult result={pharmacies}/>
            <Footer />
        </>
    )
}