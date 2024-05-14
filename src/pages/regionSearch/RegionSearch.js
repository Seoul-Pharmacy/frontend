import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import koTranslations from '../../languages/translation.ko.json';
import { useTranslation } from 'react-i18next';
import regionApi from '../../api/regionApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Header from "../../components/header/Header";
import SearchDesign from "../../components/SearchDesgin";
import RegionResult from '../../components/result/RegionResult';
import Pagination from '../../components/pagination/Pagination';
import Footer from "../../components/footer/Footer";

import LocationIcon from '../../images/NearbySearchPage/locationIcon.png';
import Arrow from '../../images/NearbySearchPage/dropDownArrow.png';
import Time from '../../images/NearbySearchPage/timeIcon.png';
import Language from '../../images/NearbySearchPage/languageIcon.png';
import Calender from '../../images/NearbySearchPage/calenderIcon.png';
import { Button, Dropdown } from "react-bootstrap";

// 구 리스트 추출
const getGuOptions = (clickHandler, t) => {
    const guList = [
        'Jongro-gu', 'Jung-gu', 'Yongsan-gu', 'Sungdong-gu', 'Gwangjin-gu',
        'Dongdaemun-gu', 'Jungrang-gu', 'Seongbuk-gu', 'Gangbuk-gu', 'Dobong-gu',
        'Nowon-gu', 'Eunpyeong-gu', 'Seodaemun-gu', 'Mapo-gu', 'Yangcheon-gu',
        'Gangseo-gu', 'Guro-gu', 'Geumcheon-gu', 'Yeongdeungpo-gu', 'Dongjak-gu',
        'Gwanak-gu', 'Seocho-gu', 'Gangnam-gu', 'Songpa-gu', 'Gangdong-gu'
    ];

    return guList.map((gu) => (
        <Dropdown.Item key={gu} id={gu} onClick={clickHandler}>
            {t(gu)}
        </Dropdown.Item>
    ));
};

const timeRanges = [
    '00:00~00:30', '00:30~01:00', '01:00~01:30', '01:30~02:00',
    '02:00~02:30', '02:30~03:00', '03:00~03:30', '03:30~04:00',
    '04:00~04:30', '04:30~05:00', '05:00~05:30', '05:30~06:00',
    '06:00~06:30', '06:30~07:00', '07:00~07:30', '07:30~08:00',
    '08:00~08:30', '08:30~09:00', '09:00~09:30', '09:30~10:00',
    '10:00~10:30', '10:30~11:00', '11:00~11:30', '11:30~12:00',
    '12:00~12:30', '12:30~13:00', '13:00~13:30', '13:30~14:00',
    '14:00~14:30', '14:30~15:00', '15:00~15:30', '15:30~16:00',
    '16:00~16:30', '16:30~17:00', '17:00~17:30', '17:30~18:00',
    '18:00~18:30', '18:30~19:00', '19:00~19:30', '19:30~20:00',
    '20:00~20:30', '20:30~21:00', '21:00~21:30', '21:30~22:00',
    '22:00~22:30', '22:30~23:00', '23:00~23:30', '23:30~24:00'
];

const languages = {
    japanese: '日本語',
    chinese: '中国語',
    english: 'English'
};

export default function RegionSearch() {
    const { t } = useTranslation();
    const [languageState, setLanguageState] = useState({
        japanese: false,
        chinese: false,
        english: false
    });
    const [gu, setGu] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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
                    alert('404: ' + t('no-pharmacies-match'));
                } else {
                    alert(`Error: ${error.message}`);
                }
            });
    }

    function getKeyByValue(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    const handleDropdownChange = () => {
        if (gu) {
            const key = getKeyByValue(koTranslations, gu);
            document.getElementById('gu-value').innerText = t(key);
        }
    };

    i18n.on('languageChanged', handleDropdownChange);

    useEffect(() => {
        const { gu, languageState, selectedDate, time, isOpen } = searchCriteria;
        if (gu && (isOpen || (selectedDate && time))) {
            fetchPharmacies(gu, languageState, selectedDate, time, isOpen);
        }
    }, [currentPage, searchCriteria]);

    const clickGuDropdown = (event) => {
        let gu = event.target.id;
        document.getElementById('gu-value').innerText = t(gu);
        let translatedGu = koTranslations[gu] || gu;
        setGu(translatedGu);
    };

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
        setSearchCriteria({ gu, languageState, selectedDate, time, isOpen });
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onSearchClick = () => {
        if (gu && (isOpen || (selectedDate && time))) {
            handleSearch(gu, languageState, selectedDate, time, isOpen);
        } else if (!gu) {
            alert(t('select-a-region'));
        } else if (selectedDate) {
            alert(t('choose-a-time'));
        } else if (time) {
            alert(t('select-a-date'));
        } else {
            alert(t('select-region-or-date'));
        }
    };

    return (
        <>
            <Header />
            <SearchDesign>{t('based-on-region')}</SearchDesign>
            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">{t('region-result-explanation-text1')}</p>
                    <h1 id="result-explanation-inner-text2">{t('region-result-explanation-text2')}</h1>
                </div>
                <div id="search-inner-wrapper">
                    <div id="search-condition-wrapper">
                        <Dropdown id="gu-dropdown-wrapper">
                            <Dropdown.Toggle id="gu-dropdown-button">
                                <img className="location-icon" src={LocationIcon} alt="" />
                                {t('district/gu')}
                                <div id="gu-value"></div>
                                <img className="arrow-icon" src={Arrow} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu id="gu-dropdown-menu">
                                {getGuOptions(clickGuDropdown, t)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div id="present-checkbox-wrapper">
                            <input type="checkbox" id="present-checkbox" name="present" checked={isOpen} onChange={handlePresentChange} />
                            <label id="present-checkbox-label" htmlFor="present-checkbox" />
                            <label id='present-checkbox-name' htmlFor="present-checkbox">{t('search-only-open')}</label>
                        </div>

                        <div id={!isOpen ? "calender-wrapper" : "disabled-calender-wrapper"}>
                            <div className="calender-button-name">
                                <img className="calender-icon" src={Calender} alt="" />
                                {t('select-date')}
                            </div>
                            <DatePicker
                                className="calender-select"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                disabled={isOpen}
                            />
                        </div>
                        <Dropdown id={!isOpen ? "time-dropdown-wrapper" : "disabled-time-dropdown-wrapper"} >
                            <Dropdown.Toggle id="time-dropdown-button" className="dropdown-select" disabled={isOpen}>
                                <img className="time-icon" src={Time} alt="" />
                                {t('bussiness-hours')}
                                <div id="time-value"></div>
                                <img className="arrow-icon" src={Arrow} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu id="time-dropdown-menu">
                                {timeRanges.map((timeRange) => (
                                    <Dropdown.Item key={timeRange} className="dropdown-item" onClick={clickTimeDropdown}>
                                        {timeRange}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <h3 id="language-choice-text"><img id="language-icon" src={Language} alt="" />{t('language')}</h3>
                        <div id="language-checkbox-wrapper">
                            {Object.entries(languages).map(([key, name]) => (
                                <React.Fragment key={key}>
                                    <input
                                        id={`speaking-${key}`}
                                        className="language-checkbox-item"
                                        type="checkbox"
                                        checked={languageState[key]}
                                        onChange={() => handleLanguageChange(key)}
                                    />
                                    <label
                                        id={`speaking-${key}-label`}
                                        className="language-checkbox"
                                        htmlFor={`speaking-${key}`}>
                                        {name}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        id="pharmacy-search-button"
                        onClick={onSearchClick}
                    >
                        {t('search')}
                    </Button>{' '}
                </div>
            </div>
            <RegionResult result={pharmacies} />
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