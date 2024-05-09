import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import './Header.css';
import homeIcon from '../../images/homeIcon.png';
import {Dropdown} from "react-bootstrap";

const lngs = {
    en: {nativeName: 'English'},
    ko: {nativeName: '한국어'},
    cn: {nativeName: '中国人'},
    jp: {nativeName: '日本語'},
};

export default function Header() {
    const { i18n, ready } = useTranslation();
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(() => localStorage.getItem('language'));

    // 컴포넌트가 로드될 때 로컬 스토리지에서 언어 설정을 불러옴
    useEffect(() => {
        if (ready) {
            const savedLang = localStorage.getItem('language');
            i18n.changeLanguage(savedLang);
            setSelectedLang(savedLang);
        }
    }, [ready]);

    // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleSelectLang = (lang) => {
        i18n.changeLanguage(lang);
        setSelectedLang(lang);
        // 로컬 스토리지에 저장
        localStorage.setItem('language', lang);
        // setDropdownOpen(false);
    };

    if (!ready) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header>
                <div id="header-content">
                    <a href="/main/Main">
                        <img className="home-icon" src={homeIcon} alt="home"/>
                    </a>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="language-dropdown">
                            {lngs[selectedLang].nativeName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {Object.keys(lngs).map((lng) => (
                                <Dropdown.Item key={lng} className="dropdown-item" onClick={() => handleSelectLang(lng)}>
                                    {lngs[lng].nativeName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <a className="title" href="/main/Main">pharmaseoul</a>
                </div>
            </header>
        </>
    );
}