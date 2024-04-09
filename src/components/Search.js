import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Search() {
    const [userInput, setUserInput] = useState('');
    const { t } = useTranslation();

    const handleChange = (e) => {
        setUserInput(e.target.value.toLowerCase())
    };

    return(
        <>
    <input onChange={handleChange} />
    <button type="submit">{t('description.search')}</button>
    </>
    );
}