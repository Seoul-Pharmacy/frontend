import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Main.css';
import Header from '../components/Header.js';
import Nearby from '../images/nearby.png';
import Region from '../images/region.png';
import Mark from '../images/locationMarkIcon.png';
import Footer from '../components/Footer.js';

export default function Main() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className="main-wrapper">
                <header className="mainHeader"><Header /></header>
                <main className="selection">
                    <div>
                        <img className="locationMark" src={Mark} alt="location" />
                    </div>
                    <section>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Nearby})`
                            }}>
                            <p className="selectOptionTitle">{t('description.find_near')}</p>
                            <p className="selectOptionDescription">{t('description.find_near_description')}</p>
                            <button onClick={() => navigate('/nearbysearch')}>선택하기</button>
                        </div>
                    </section>
                    <section>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Region})`
                            }}>
                            <p className="selectOptionTitle">{t('description.find_by_region')}</p>
                            <p className="selectOptionDescription">{t('description.find_by_region_description')}</p>
                            <button onClick={() => navigate('/regionsearch')}>선택하기</button>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}