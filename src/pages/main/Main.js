import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import useUserLocation from '../../Hooks/useUserLocation.js';

import './Main.css';

import Header from '../../components/header/Header.js';
import Footer from '../../components/footer/Footer.js';

import Nearby from '../../images/nearby.png';
import Region from '../../images/region.png';
import Glasses from '../../images/readingGlassesIcon.png';
import Mark from '../../images/locationMarkIcon.png';


export default function Main() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const location = useUserLocation();

    const goToNearbySearch = () => {
        if (location && location.lat && location.lng) {
            // URL을 통해 위치 정보를 전달
            navigate(`/nearbysearch?lat=${location.lat}&lng=${location.lng}`);
        } else { // 위치 권한 거부 시
            console.error("Location data is not available.");
            alert(t('location-permission'));
        }
    };

    return (
        <>
            <Header/>
            <div id="body-wrapper">
                <div id="findPharmacy-wrapper">
                    <div id="findPharmacy-text1">
                        {t('find_pharmacy_explanation')}
                    </div>
                    <div id="findPharmacy-text2">{t('find_pharmacy')}
                    <img id="readingGlasses" src={Glasses} alt=""/></div>
                    <img className="locationMark" src={Mark} alt="location mark"/>
                </div>
                <section>
                    <div
                        className="selectOptionButton" style={{
                        backgroundImage: `url(${Nearby})`
                    }}>
                        <h3 className="selectOptionTitle">{t('find_near')}</h3>
                        <p className="selectOptionDescription">{t('find_near_description')}</p>
                        <button className="SelectOptionInnerButton" onClick={goToNearbySearch}>
                            {t('select')}
                        </button>
                    </div>
                    <div
                        className="selectOptionButton" style={{
                        backgroundImage: `url(${Region})`
                    }}>
                        <h3 className="selectOptionTitle">{t('find_by_region')}</h3>
                        <p className="selectOptionDescription">{t('find_by_region_description')}</p>
                        <button className="SelectOptionInnerButton" onClick={() => navigate('/regionsearch')}>
                            {t('select')}
                        </button>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
}