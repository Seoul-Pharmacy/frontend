import React, { useState, useEffect } from 'react';

export default function useIsPossibleLanguage({ english, japanese, chinese }) {
    const [isPossibleLanguage, setisPossibleLanguage] = useState({
        speaking_english: false,
        speaking_japanese: false,
        speaking_chinese: false
    });
    const toggleLanguage = (language) => {
        setisPossibleLanguage(prevLanguages => ({
            ...prevLanguages,
            [language]: !prevLanguages[language]
        }));
    };

    return [isPossibleLanguage, toggleLanguage];
}