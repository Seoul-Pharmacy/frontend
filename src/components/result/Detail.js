import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import apiDetail from '../../api/apiDetail';
import Map from "../map/Map";
import './Detail.css';
import {Dropdown} from "react-bootstrap";

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'holiday'];

export default function Detail({ identifier }) {
    const { t } = useTranslation();
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasIdentifier, setHasIdentifier] = useState(false);

    useEffect(() => {
        // `identifier`가 있는 경우에만 API 호출을 진행
        if (identifier) {
            setHasIdentifier(true);
            setLoading(true); // 응답을 기다리는 동안 로딩 상태로 전환
            apiDetail(identifier)
                .then((data) => {
                    if (data) {
                        setPharmacy(data);
                        setError(null);
                    } else {
                        setError('약국 정보를 불러오는 데 실패했습니다.');
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message || '오류가 발생했습니다.');
                    setLoading(false);
                });
        } else {
            setHasIdentifier(false);
            setLoading(false);
            setPharmacy(null);
        }
    }, [identifier]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (!hasIdentifier) {
        return;
    }

    if (loading) return (
        <article id="result-details">
            <div id="result-details-else">
                loading...
            </div>
        </article>
    );
    if (error) return (
        <article id="result-details">
            <div id="result-details-else">
                error: {error}
            </div>
        </article>
    )
    if (!pharmacy) return (
        <article id="result-details">
            <div id="result-details-else">
                No pharmacy choosed.
            </div>
        </article>
    );

    return (
        <article id="result-details">
            <Map lat={parseFloat(pharmacy.latitude)} lng={parseFloat(pharmacy.longitude)}/>
            <div id="result-details-text-wrapper">
                <h1
                    id="result-details-name"
                    onClick={() => copyToClipboard(pharmacy.name)}
                >
                    {pharmacy.name}
                </h1>
                <div
                    className="result-details-text-item"
                    onClick={() => copyToClipboard(`${pharmacy.si} ${pharmacy.gu} ${pharmacy.road_name_address}`)}
                >
                    {t('address')} | {pharmacy.si} {pharmacy.gu} {pharmacy.road_name_address}
                </div>

                <Dropdown>
                    <Dropdown.Toggle id="operating-hours-name" className="result-details-text-item" variant="success">
                        {t('bussiness-hours')} |
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="operating-hours-dropdown">
                        {days.map((day, index) => (
                            <Dropdown.Item key={index}>{t(day)}: {pharmacy[`${day}_open_time`]}~{pharmacy[`${day}_close_time`]}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="result-details-text-item">{t('number')} | {pharmacy.main_number}</div>
                <div className="result-details-text-item">
                    {(pharmacy.speaking_english || pharmacy.speaking_chinese || pharmacy.speaking_japanese) ? <span>{t('possible-language')} | </span> : ""}
                    {pharmacy.speaking_english ? <span>English </span> : ''}
                    {pharmacy.speaking_chinese ? <span>中国人 </span> : ''}
                    {pharmacy.speaking_japanese ? <span>日本語 </span> : ''}
                </div>
            </div>
        </article>
    );
}