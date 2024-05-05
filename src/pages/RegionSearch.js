import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import regionApi from '../api/regionApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RegionSearch.css';

import Header from "../components/Header";
import SearchDesign from "../components/SearchDesgin";
import RegionResult from '../components/result/RegionResult';
import Pagination from '../components/Pagination';
import Footer from "../components/Footer";

import LocationIcon from '../images/NearbySearchPage/locationIcon.png';
import Arrow from '../images/NearbySearchPage/dropDownArrow.png';
import Time from '../images/NearbySearchPage/timeIcon.png';
import Language from '../images/NearbySearchPage/languageIcon.png';
import { Button, Dropdown } from "react-bootstrap";

export default function RegionSearch() {
    const {t} = useTranslation();
    const [languageState, setLanguageState] = useState({
        japanese: false,
        chinese: false,
        english: false
    });
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pharmacies, setPharmacies] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;

    const fetchPharmacies = (gu, language, date, time) => {
        regionApi(currentPage, gu, language.japanese, language.chinese, language.english, date, time)
            .then(data => {
                setPharmacies(data.results || []);
                setTotalItems(data.count || 0);
            }).catch(error => {
                console.error("Failed to fetch pharmacies:", error);
            });
    }

    useEffect(() => {
        fetchPharmacies(gu, languageState);
    }, [currentPage]);

    const [gu, setGu] = useState(null);
    const clickGuDropdown = (event) => {
        let gu = event.target.textContent;
        setGu(gu);
        document.getElementById('gu-value').innerText = gu;
    };

    const [time, setTime] = useState(null);
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

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    const handleSearch = () => {
        fetchPharmacies(gu, languageState, selectedDate, time);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchPharmacies(gu, languageState, selectedDate);
    };
    
    return(
        <>
            <Header />
            <SearchDesign>선택 지역 기반 정보 제공</SearchDesign>
            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">{t('description.region-result-explanation-text1')}</p>
                    <h1 id="result-explanation-inner-text2">{t('description.region-result-explanation-text2')}</h1>
                </div>
                <div id="search-inner-wrapper">
                    <div id="search-condition-wrapper">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-select">
                                <img className="location-icon" src={LocationIcon} alt=""/>
                                {t('description.district/gu')}
                                <div id="gu-value"></div>
                                <img className="arrow-icon" src={Arrow} alt=""/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Jongro-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Jung-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Yongsan-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Sungdong-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gwangjin-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Dongdaemun-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Jungrang-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Seongbuk-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gangbuk-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Dobong-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Nowon-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Eunpyeong-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Seodaemun-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Mapo-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Yangcheon-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gangseo-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Guro-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Geumcheon-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Yeongdeungpo-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Dongjak-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gwanak-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Seocho-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gangnam-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Songpa-gu')}</Dropdown.Item>
                                <Dropdown.Item onClick={clickGuDropdown}>{t('description.Gangdong-gu')}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="container">
                            <div className="datepicker-container">
                                <h3>{t('description.select-date')}</h3>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-select">
                                <img className="location-icon" src={Time} alt=""/>
                                {t('description.bussiness-hours')}
                                <div id="time-value"></div>
                                <img className="arrow-icon" src={Arrow} alt=""/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>00:00~00:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>00:30~01:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>01:00~01:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>01:30~01:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>02:00~02:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>02:30~03:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>03:00~03:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>03:30~04:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>04:00~04:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>04:30~05:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>05:00~05:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>05:30~06:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>06:00~06:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>06:30~07:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>07:00~07:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>07:30~07:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>07:00~07:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>07:30~08:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>08:00~08:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>08:30~09:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>09:00~09:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>09:30~10:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>10:00~10:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>10:30~11:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>11:00~11:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>11:30~12:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>12:00~12:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>12:30~13:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>13:00~13:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>13:30~14:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>14:00~14:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>14:30~15:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>15:00~15:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>15:30~16:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>16:00~16:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>16:30~17:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>17:00~17:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>17:30~17:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>17:00~17:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>17:30~18:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>18:00~18:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>18:30~19:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>19:00~19:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>19:30~20:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>20:00~20:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>20:30~21:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>21:00~21:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>21:30~21:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>22:00~22:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>22:30~23:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>23:00~23:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" onClick={clickTimeDropdown}>23:30~24:00</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <h3 id="language-choice-text"><img id="language-icon" src={Language} alt=""/>{t('description.language')}</h3>
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
                                    English
                            </label>
                    </div>
                    </div>

                    <Button
                        variant="primary"
                        id="pharmacy-search-button"
                        onClick={handleSearch}
                    >
                        {t('description.search')}
                    </Button>{' '}
                </div>
            </div>
            <RegionResult result={pharmacies}/>
            <Pagination
                totalItems={totalItems}
                paginate={handlePageChange}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />
            <Footer />
        </>
    );
}