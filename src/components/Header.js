import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './Header.css';
import homeIcon from '../images/homeIcon.png';
import {Dropdown} from "react-bootstrap";

const lngs = {
    en: {nativeName: 'English'},
    ko: {nativeName: '한국어'},
    cn: {nativeName: '中国人'},
    jp: {nativeName: '日本語'},
};

export default function Header() {
    const {i18n} = useTranslation();
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.resolvedLanguage);

    // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleSelectLang = (lang) => {
        i18n.changeLanguage(lang);
        setSelectedLang(lang);
        // setDropdownOpen(false);
    };

    return (
        <>
            <header>
                <div id="header-content">
                    <a href="/main">
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

                    {/*<div className="language-dropdown">*/}
                    {/*    <div className="dropdown-btn" onCli  ck={toggleDropdown}>*/}
                    {/*        {lngs[selectedLang].nativeName}*/}
                    {/*    </div>*/}
                    {/*    {dropdownOpen && (*/}
                    {/*        <div className="dropdown-item-wrapper">*/}
                    {/*            {Object.keys(lngs).map((lng) => (*/}
                    {/*                <div key={lng} className="dropdown-item" onClick={() => handleSelectLang(lng)}>*/}
                    {/*                    {lngs[lng].nativeName}*/}
                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <a className="title" href="/main">pharmaseoul</a>
                </div>
            </header>
        </>
    );
}