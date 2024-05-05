import { useTranslation } from 'react-i18next';

export default function({ id, name, distance = 0, si, gu, road_name_address }) {
    const {t} = useTranslation();
    
    if (id === 'nearby-summarize') {
        return(
            <div>
                <h6>{name}</h6>
                <p>{t('description.from-me')} {distance}</p>
                <p>{si} {gu} {road_name_address}</p>
            </div>
        );
    } else {
        return(
            <div>
                <h6>{name}</h6>
                <p>{si} {gu} {road_name_address}</p>
            </div>
        );
    }
}