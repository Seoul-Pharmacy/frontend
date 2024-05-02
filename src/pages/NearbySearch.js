import React, { useState, useEffect } from "react";
import useIsOpen from '../Hooks/useIsOpen';
import useLanguage from '../Hooks/useLanguage';
import { useLocation } from 'react-router-dom';
import nearbyApi from '../api/nearbyApi';
import './NearbySearch.css';

import Header from "../components/Header";
import SearchDesign from "../components/SearchDesgin";
import Footer from "../components/Footer";
import Result from "../components/result/Result";

import LocationIcon from '../images/NearbySearchPage/locationIcon.png';
import Arrow from '../images/NearbySearchPage/dropDownArrow.png';
import Time from '../images/NearbySearchPage/timeIcon.png';

export default function NearbySearch({ userLocation }) {
    const [isOpen, toggleOpen] = useIsOpen();
    const [language, changeLanguage] = useLanguage();

    const [pharmacies, setPharmacies] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const lat = query.get('lat');
    const lng = query.get('lng');
    const location = { lat, lng };

    const fetchPharmacies = () => {
        if (lat && lng) {
            nearbyApi(language , location, isOpen)
                .then(data => {
                    setPharmacies(data.results || []);
                }).catch(error => {
                    console.error("Failed to fetch pharmacies:", error);
                });
        }
    };

    useEffect(() => {
        fetchPharmacies();
    }, [lat, lng]);

    const [timeDropdownMode, setTimeDropDownMode] = useState(false);
    const [guDropdownMode, setGuDropdownMode] = useState(false);

    const openDropdown = (dropdownName, isOpen, setIsOpen) => {
        let content;
        if (dropdownName === 'si') {
            content = document.getElementById("si-dropdown");
        } else {
            content = document.getElementById("time-dropdown");
        }

        if (!isOpen) {
            content.style.display = 'block';
            setIsOpen(true);
            return;
        }

        content.style.display = 'none';
        setIsOpen(false);
    };


    return (
        <>
            <Header />
            <SearchDesign>위치기반 맞춤형 정보 제공</SearchDesign>
            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">내 주변에 있는, 지금 영업중인</p>
                    <h1 id="result-explanation-inner-text2">가까운 약국을 알려드려요!</h1>
                </div>
                <div id="search-inner-wrapper">
                    {/*<input type="text" placeholder="약국 이름 검색"/>*/}
                    {/*<button type="submit">검색</button>*/}

                    <div className="dropdown">
                        <button onClick={() => {
                            openDropdown('si', guDropdownMode, setGuDropdownMode)
                        }} className="dropdown-button">
                            <img className="location-icon" src={LocationIcon} alt=""/>
                            군/구
                            <img className="arrow-icon" src={Arrow} alt=""/>
                        </button>
                        <div id="si-dropdown" className="dropdown-content">
                            <div className="dropdown-item">profile</div>
                            <div className="dropdown-item">write a post</div>
                            <div className="dropdown-item">settings</div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button onClick={() => {
                            openDropdown('time', timeDropdownMode, setTimeDropDownMode)
                        }} className="dropdown-button">
                            <img className="location-icon" src={Time} alt=""/>
                            영업시간
                            <img className="arrow-icon" src={Arrow} alt=""/>
                        </button>
                        <div id="time-dropdown" className="dropdown-content">
                            <div className="dropdown-item">profile</div>
                            <div className="dropdown-item">write a post</div>
                            <div className="dropdown-item">settings</div>
                        </div>
                    </div>
                    <div id="language-checkbox-wrapper">
                        <input id="speaking-japanese" type="checkbox"/>
                        <label id="speaking-japanese-label" className="language-checkbox" htmlFor="speaking-japanese">일본어 가능</label>
                        <input id="speaking-chinese" type="checkbox"/>
                        <label id="speaking-chinese-label" className="language-checkbox" htmlFor="speaking-chinese">중국어 가능</label>
                        <input id="speaking-english" type="checkbox"/>
                        <label id="speaking-english-label" className="language-checkbox" htmlFor="speaking-english">영어 가능</label>
                    </div>
                    <button
                        id="pharmacy-search-button"
                        onClick={fetchPharmacies}
                    >
                        검색
                    </button>
                </div>
            </div>
            <Result result={pharmacies}/>
            <Footer />
        </>
    )
}