import React from 'react';
import { useTranslation } from 'react-i18next';

import './Main.css';
import Header from '../components/Header.js';
import Nearby from '../images/nearby.png';
import Region from '../images/region.png';
import Mark from '../images/locationMarkIcon.png';
import Footer from '../components/Footer.js';

export default function Main() {
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
                    <button
                        className="selectOption"
                        type="submit"                      style={{
                            backgroundImage: `url(${Nearby})`
                        }}>
                        <div>
                            <p>{t('description.find_near')}</p>
                            <p>{t('description.find_near_description')}</p>
                        </div>
                    </button>
                </section>
                <section>
                <button
                        className="selectOption"
                        type="submit"                      style={{
                            backgroundImage: `url(${Region})`
                        }}>
                        <p>{t('description.find_by_region')}</p>
                        <p>{t('description.find_by_region_description')}</p>
                    </button>
                </section>
            </main>
            </div>
            <Footer />
        </>
    )
}