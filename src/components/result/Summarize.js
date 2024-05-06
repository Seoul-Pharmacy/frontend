import { useTranslation } from 'react-i18next';
import './Summarize.css';

export default function({ id, name, distance = 0, si, gu, road_name_address, speaking_english, speaking_chinese, speaking_japanese }) {
    const {t} = useTranslation();
    
    if (id === 'nearby-summarize') {
        return(
            <div id="summarize-result">
                <h6 id="summarize-name">{name}</h6>
                <div id="summarize-info">
                    <div>{t('description.from-me')}{distance}</div>
                    <div>{si} {gu} {road_name_address}</div>
                    <div>
                        {speaking_english ? <span>english</span> : ''}
                        {speaking_chinese ? <span>中国人</span> : ''}
                        {speaking_japanese ? <span>日本語</span> : ''}
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <div id="summarize-result">
                <h6 id="summarize-name">{name}</h6>
                <div id="summarize-info">
                    <div>{si} {gu} {road_name_address}</div>
                    <div>
                        {speaking_english ? <span> english</span> : ''}
                        {speaking_chinese ? <span> 中国人</span> : ''}
                        {speaking_japanese ? <span>日本語</span> : ''}
                    </div>
                </div>
            </div>
        );
    }
}