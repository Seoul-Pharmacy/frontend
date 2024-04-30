import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './Header.css';
import homeIcon from '../images/homeIcon.png';

const lngs = {
    en: {nativeName: 'English'},
    ko: {nativeName: '한국어'},
    cn: {nativeName: '华侨华人'},
    jp: {nativeName: '日本語です'},
};

export default function Header() {
    const {i18n} = useTranslation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.resolvedLanguage);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleSelectLang = (lang) => {
        i18n.changeLanguage(lang);
        setSelectedLang(lang);
        setDropdownOpen(false);
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <a href="/main">
                        <img className="home-icon" src={homeIcon} alt="home"/>
                    </a>
                    <div className="language-dropdown">
                        <div className="dropdown-btn" onClick={toggleDropdown}>
                            {lngs[selectedLang].nativeName}
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-item-wrapper">
                                {Object.keys(lngs).map((lng) => (
                                    <div key={lng} className="dropdown-item" onClick={() => handleSelectLang(lng)}>
                                        {lngs[lng].nativeName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <a className="title" href="/main">pharmaseoul</a>
                </div>
            </header>
        </>
    );
}