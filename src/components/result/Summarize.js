import { useTranslation } from 'react-i18next';
import './Summarize.css';

export default function({ id, name, distance = 0, si, gu, road_name_address }) {
    const {t} = useTranslation();
    
    if (id === 'nearby-summarize') {
        return(
            <div id="summarize-result">
                <h6 id="summarize-name">{name}</h6>
                <p id="summarize-info">
                    <div>{t('description.from-me')}{distance}</div>
                    <div>{si} {gu} {road_name_address}</div>
                </p>
            </div>
        );
    } else {
        return(
            <div id="summarize-result">
                <h6 id="summarize-name">{name}</h6>
                <p id="summarize-info">
                    <div>{si} {gu} {road_name_address}</div>
                </p>
            </div>
        );
    }
}