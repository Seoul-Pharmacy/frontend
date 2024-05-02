import React, { useState, useEffect } from 'react';

export default function useIsPossibleLanguage( language ) {
    // const [isPossibleLanguage, setisPossibleLanguage] = useState({
    //     speaking_english: false,
    //     speaking_japanese: false,
    //     speaking_chinese: false
    // });
    // const toggleLanguage = (language) => {
    //     setisPossibleLanguage(prevLanguages => ({
    //         ...prevLanguages,
    //         [language]: !prevLanguages[language]
    //     }));
    // };
    
    //return [isPossibleLanguage, toggleLanguage];

    const [isPossibleLanguage, setIsPossibleLanguage] = useState('');

    const changeLanguage = (newLanguage) => {
        setIsPossibleLanguage(newLanguage);
    };
    
    return [isPossibleLanguage, changeLanguage];
}