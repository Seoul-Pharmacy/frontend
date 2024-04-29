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
import Footer from '../components/Footer.js';

// 모달 컴포넌트 정의
function PopUp({ isOpen, toggleModal }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            ariaHideApp={false}
            contentLabel="Region Selection Modal"
            shouldCloseOnOverlayClick={false}
        >
            <h2>지역 선택</h2>
            <button onClick={toggleModal}>닫기</button>
        </Modal>
    );
}

// 메인 컴포넌트 정의
export default function Main() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <>
            <div className="main-wrapper">
                <Header />
                <main className="selection">
                    <div>
                        <img src={Glasses} alt="reading glasses" />
                        <img className="locationMark" src={Mark} alt="location mark" />
                    </div>
                    <section>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Nearby})`
                            }}>
                            <p className="selectOptionTitle">{t('description.find_near')}</p>
                            <p className="selectOptionDescription">{t('description.find_near_description')}</p>
                            <button className="whiteSelectButton" onClick={() => navigate('/nearbysearch')}>
                                선택하기
                            </button>
                        </div>
                        <div
                            className="selectOptionButton" style={{
                                backgroundImage: `url(${Region})`
                            }}>
                            <p className="selectOptionTitle">{t('description.find_by_region')}</p>
                            <p className="selectOptionDescription">{t('description.find_by_region_description')}</p>
                            <button className="whiteSelectButton" onClick={toggleModal}>
                                선택하기
                            </button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
            <PopUp isOpen={modalOpen} toggleModal={toggleModal} />
        </>
    );
}