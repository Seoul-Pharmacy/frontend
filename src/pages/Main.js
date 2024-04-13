import React from 'react';
import { useTranslation } from 'react-i18next';

import './Main.css';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Footer from '../components/Footer.js';

export default function Main() {
    const { t } = useTranslation();
    return (
        <>
            <header className="mainHeader"><Header /></header>
            <main className="selection">
                <section>
                    <p>관련 로고</p>
                    <button>
                        <p>{t('description.find_near')}</p>
                        <p>{t('description.find_near_description')}</p>
                    </button>
                </section>
                <section>
                    <p>관련 로고</p>
                    <button>
                        <p>{t('description.find_by_region')}</p>
                        <p>{t('description.find_by_region_description')}</p>
                    </button>
                </section>
            </main>
            <Footer />
        </>
    )
}