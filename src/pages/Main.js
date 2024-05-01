import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

import './Main.css';
import Header from '../components/Header.js';

import Nearby from '../images/nearby.png';
import Region from '../images/region.png';
import Glasses from '../images/readingGlassesIcon.png';
import Mark from '../images/locationMarkIcon.png';

import CloseButton from '../images/close.png';

import Footer from '../components/Footer.js';

function PopUp({ isOpen, toggleModal }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            ariaHideApp={false}
            contentLabel="Region Selection Modal"
            shouldCloseOnOverlayClick={false}
            overlayClassName="regionModal-overlay"
            className="regionModal-content"
        >
            <img className="closeButton" src={CloseButton} onClick={toggleModal} alt="close button"/>
            <h2>지역과 시간을 설정해보세요!</h2>
            <p>영업시간</p>
            <select value={selectedOption} onChange={handleDropdownChange}>
                <option></option>
            </select>
            <button className="selectionComplete">선택완료</button>
        </Modal>
    );
}

export default function Main() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <>
            <div id="main-wrapper">
                <Header />
                <div id="body-wrapper">
                    <div id="findPharmacy-wrapper">

                        <div id="findPharmacy-text1">
                            {t('description.find_pharmacy_explanation')}
                        </div>
                        <div id="findPharmacy-text2">{t('description.find_pharmacy')}<img id="readingGlasses" src={Glasses} alt=""/></div>
                        <img className="locationMark" src={Mark} alt="location mark"/>
                    </div>
                    <section>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Nearby})`
                            }}>
                            <h3 className="selectOptionTitle">{t('description.find_near')}</h3>
                            <p className="selectOptionDescription">{t('description.find_near_description')}</p>
                            <button className="SelectOptionInnerButton" onClick={() => navigate('/nearbysearch')}>
                                {t('description.select')}
                            </button>
                        </div>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Region})`
                            }}>
                            <h3 className="selectOptionTitle">{t('description.find_by_region')}</h3>
                            <p className="selectOptionDescription">{t('description.find_by_region_description')}</p>
                            <button className="SelectOptionInnerButton" onClick={toggleModal}>
                                {t('description.select')}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
            <PopUp isOpen={modalOpen} toggleModal={toggleModal} />
        </>
    );
}