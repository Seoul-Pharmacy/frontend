import React, {useEffect, useState} from 'react';
import i18n from 'i18next';
import koTranslations from '../languages/translation.ko.json';
import {useTranslation} from 'react-i18next';
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
import Calander from '../images/NearbySearchPage/calanderIcon.png';
import {Button, Dropdown} from "react-bootstrap";

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

    // 검색 필터 마지막 저장 값
    const [searchCriteria, setSearchCriteria] = useState({
        gu: null,
        languageState: {
            japanese: false,
            chinese: false,
            english: false,
        },
        selectedDate: null,
        time: null,
        isOpen: true,
    });

    const fetchPharmacies = (gu, language, date, time, isOpen) => {
        regionApi(currentPage, gu, language.japanese, language.chinese, language.english, date, time, isOpen)
            .then(data => {
                setPharmacies(data.results || []);
                setTotalItems(data.count || 0);
            }).catch(error => {
            console.error('Failed to fetch pharmacies:', error);
            if (error.message === '404') {
                alert('404: No pharmacies found.');
            } else {
                alert(`Error: ${error.message}`);
            }
        });
    }

    const handleDropdownChange = () => {
        if (gu) {
            document.getElementById('gu-value').innerText = t('description.' + gu);
        }

    };

    i18n.on('languageChanged', handleDropdownChange);

    useEffect(() => {
        const {gu, languageState, selectedDate, time, isOpen} = searchCriteria;
        if (gu && (isOpen || (selectedDate && time))) {
            fetchPharmacies(gu, languageState, selectedDate, time, isOpen);
        }
    }, [currentPage, searchCriteria]);

    const [gu, setGu] = useState(null);
    const clickGuDropdown = (event) => {
        let gu = event.target.id;
        let translatedGu = koTranslations[gu] || gu;
        setGu(translatedGu);
        document.getElementById('gu-value').innerText = t('description.' + gu);
    };

    const [time, setTime] = useState(null);
    const clickTimeDropdown = (event) => {
        let time = event.target.textContent;
        setTime(time);
        document.getElementById('time-value').innerText = time;
    };

    const [isOpen, setIsOpen] = useState(true);
    const handlePresentChange = (event) => {
        const checked = event.target.checked;
        if (checked) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleLanguageChange = (language) => {
        setLanguageState((prevState) => ({
            ...prevState,
            [language]: !prevState[language]
        }));
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    const handleSearch = (gu, languageState, selectedDate, time, isOpen) => {
        setSearchCriteria({gu, languageState, selectedDate, time, isOpen});
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onSearchClick = () => {
        if (gu && (isOpen || (selectedDate && time))) {
            handleSearch(gu, languageState, selectedDate, time, isOpen);
        } else if (!gu) {
            alert('구를 선택하세요.');
        } else if (selectedDate) {
            alert('시간을 선택하세요.');
        } else if (time) {
            alert('날짜를 선택하세요.');
        } else {
            alert('현재 운영 중 여부 혹은 날짜와 시간을 선택하세요.');
        }
    };

    return (
        <>
            <Header/>
            <SearchDesign>{t('description.based-on-region')}</SearchDesign>
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
                                <Dropdown.Item id="Jongro-gu"
                                               onClick={clickGuDropdown}>{t('description.Jongro-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Jung-gu"
                                               onClick={clickGuDropdown}>{t('description.Jung-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Yongsan-gu"
                                               onClick={clickGuDropdown}>{t('description.Yongsan-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Sungdong-gu"
                                               onClick={clickGuDropdown}>{t('description.Sungdong-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gwangjin-gu"
                                               onClick={clickGuDropdown}>{t('description.Gwangjin-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Dongdaemun-gu"
                                               onClick={clickGuDropdown}>{t('description.Dongdaemun-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Jungrang-gu"
                                               onClick={clickGuDropdown}>{t('description.Jungrang-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Seongbuk-gu"
                                               onClick={clickGuDropdown}>{t('description.Seongbuk-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gangbuk-gu"
                                               onClick={clickGuDropdown}>{t('description.Gangbuk-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Dobong-gu"
                                               onClick={clickGuDropdown}>{t('description.Dobong-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Nowon-gu"
                                               onClick={clickGuDropdown}>{t('description.Nowon-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Eunpyeong-gu"
                                               onClick={clickGuDropdown}>{t('description.Eunpyeong-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Seodaemun-gu"
                                               onClick={clickGuDropdown}>{t('description.Seodaemun-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Mapo-gu"
                                               onClick={clickGuDropdown}>{t('description.Mapo-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Yangcheon-gu"
                                               onClick={clickGuDropdown}>{t('description.Yangcheon-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gangseo-gu"
                                               onClick={clickGuDropdown}>{t('description.Gangseo-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Guro-gu"
                                               onClick={clickGuDropdown}>{t('description.Guro-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Geumcheon-gu"
                                               onClick={clickGuDropdown}>{t('description.Geumcheon-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Yeongdeungpo-gu"
                                               onClick={clickGuDropdown}>{t('description.Yeongdeungpo-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Dongjak-gu"
                                               onClick={clickGuDropdown}>{t('description.Dongjak-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gwanak-gu"
                                               onClick={clickGuDropdown}>{t('description.Gwanak-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Seocho-gu"
                                               onClick={clickGuDropdown}>{t('description.Seocho-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gangnam-gu"
                                               onClick={clickGuDropdown}>{t('description.Gangnam-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Songpa-gu"
                                               onClick={clickGuDropdown}>{t('description.Songpa-gu')}</Dropdown.Item>
                                <Dropdown.Item id="Gangdong-gu"
                                               onClick={clickGuDropdown}>{t('description.Gangdong-gu')}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div id="present-checkbox-wrapper">
                            <input type="checkbox" id="chk1"
                                   name="present"
                                   checked={isOpen}
                                   onChange={handlePresentChange}/><label id="present-checkbox-label"
                                                                          htmlFor="chk1"></label>

                            <label id='present-checkbox-name' htmlFor="chk1">현재 영업중인 약국만 검색</label>
                        </div>

                        <div id="calanger-wrapper">
                            <div className="calander-button-name">
                                <img className="calander-icon" src={Calander} alt=""/>
                                {t('description.select-date')}
                            </div>
                            <DatePicker
                                className="dropdown-select"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                disabled={isOpen}
                            />
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="dropdown-select" disabled={isOpen}>
                                <img className="location-icon" src={Time} alt=""/>
                                {t('description.bussiness-hours')}
                                <div id="time-value"></div>
                                <img className="arrow-icon" src={Arrow} alt=""/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>00:00~00:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>00:30~01:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>01:00~01:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>01:30~01:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>02:00~02:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>02:30~03:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>03:00~03:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>03:30~04:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>04:00~04:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>04:30~05:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>05:00~05:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>05:30~06:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>06:00~06:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>06:30~07:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>07:00~07:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>07:30~07:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>07:00~07:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>07:30~08:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>08:00~08:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>08:30~09:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>09:00~09:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>09:30~10:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>10:00~10:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>10:30~11:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>11:00~11:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>11:30~12:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>12:00~12:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>12:30~13:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>13:00~13:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>13:30~14:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>14:00~14:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>14:30~15:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>15:00~15:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>15:30~16:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>16:00~16:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>16:30~17:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>17:00~17:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>17:30~17:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>17:00~17:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>17:30~18:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>18:00~18:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>18:30~19:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>19:00~19:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>19:30~20:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>20:00~20:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>20:30~21:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>21:00~21:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>21:30~21:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>22:00~22:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>22:30~23:00</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>23:00~23:30</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item"
                                               onClick={clickTimeDropdown}>23:30~24:00</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <h3 id="language-choice-text"><img id="language-icon" src={Language}
                                                           alt=""/>{t('description.language')}</h3>
                        <div id="language-checkbox-wrapper">
                            <input
                                id="speaking-japanese"
                                type="checkbox"
                                checked={languageState.japanese}
                                onChange={() => handleLanguageChange('japanese')}
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
                                onChange={() => handleLanguageChange('chinese')}
                            />
                            <label
                                id="speaking-chinese-label" className="language-checkbox" htmlFor="speaking-chinese">
                                中国人
                            </label>
                            <input
                                id="speaking-english"
                                type="checkbox"
                                checked={languageState.english}
                                onChange={() => handleLanguageChange('english')}
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
                        onClick={onSearchClick}
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
            <Footer/>
        </>
    );
}