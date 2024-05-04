import { useState } from 'react';
export default function Checkbox1() {
    const [languageState, setLanguageState] = useState({
        japanese: false,
        chinese: false,
        english: false
    });

    const handleCheckboxChange = (language) => {
        setLanguageState((prevState) => ({
            ...prevState,
            [language]: !prevState[language]
        }));
    };
    return(
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
                        english
                </label>
        </div>
    );
}