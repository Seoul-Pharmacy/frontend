import React, { useState, useEffect } from "react";
import useIsOpen from '../Hooks/useIsOpen';
import useLanguage from '../Hooks/useLanguage';
import useUserLocation from '../Hooks/useUserLocation';
import { useLocation } from 'react-router-dom';
import nearbyApi from '../api/nearbyApi';
import './NearbySearch.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Result from "../components/result/Result";

import GreenBag from '../images/NearbySearchPage/greenBag.png';
import Hand from '../images/NearbySearchPage/hand.png';

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

    return (
        <>
            <Header />
            <div className="nearby-search-design">
                <div className="left-rec">
                    <p id="nearby-description">위치기반 맞춤형 정보 제공</p>
                    <p id="for-you">고객님이 찾던 약국,<p id="is-here">여기 다 있습니다!</p></p>
                </div>
                <div className="right-rec" />
                <div id="nearby-icon">
                    <img className="greenBag" src={GreenBag} />
                    <img className="hand" src={Hand} />
                </div>
            </div>

            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">내 주변에 있는, 지금 영업중인</p>
                    <h1 id="result-explanation-inner-text2">가까운 약국을 알려드려요!</h1>
                </div>
                <div id="search-inner-wrapper">
                    <textarea>약국 이름 검색</textarea>
                    <br />
                    <select>
                        <option selected value="시 구 드롭다움">시 구 드롭다움</option>
                    </select>
                    <br />
                    <select>
                        <option selected value="시간 드롭다운">시간 드롭다운</option>
                    </select>
                    <div>외국어 선택</div>
                    <button>검색</button>
                </div>
            </div>
            <div>
                <p>{lat}</p>
                <p>{lng}</p>
                <button onClick={fetchPharmacies}>검색</button>
                {pharmacies.map(pharmacy => (
                    <div key={pharmacy.id} result={pharmacy}></div>
                ))}
            </div>
            <Result result={pharmacies}/>
            <Footer />
        </>
    )
}