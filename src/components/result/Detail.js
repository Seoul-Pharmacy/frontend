import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import apiDetail from '../../api/apiDetail';
import Map from "../map/Map";
import './Detail.css';
import {Dropdown} from "react-bootstrap";

export default function Detail({ identifier }) {
    const { t } = useTranslation();
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasIdentifier, setHasIdentifier] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');

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
        navigator.clipboard.writeText(text).then(() => {
            setCopyMessage('copied');
            setTimeout(() => setCopyMessage(''), 2000); // 2초 후에 메시지 초기화
        });
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
                    className="result-details-text-item"
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
                        <Dropdown.Item>{t('mon')}: {pharmacy.mon_open_time}~{pharmacy.mon_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('tue')}: {pharmacy.tue_open_time}~{pharmacy.tue_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('wed')}: {pharmacy.wed_open_time}~{pharmacy.wed_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('thu')}: {pharmacy.thu_open_time}~{pharmacy.thu_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('fri')}: {pharmacy.fri_open_time}~{pharmacy.fri_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('sat')}: {pharmacy.sat_open_time}~{pharmacy.sat_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('sun')}: {pharmacy.sun_open_time}~{pharmacy.sun_close_time}</Dropdown.Item>
                        <Dropdown.Item>{t('holiday')}: {pharmacy.holiday_open_time}~{pharmacy.holiday_close_time}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <div className="result-details-text-item">{t('description.number')} | {pharmacy.main_number}</div>
                <div className="result-details-text-item">
                    {(pharmacy.speaking_english || pharmacy.speaking_chinese || pharmacy.speaking_japanese) ? <span>가능한 언어 | </span> : ""}
                    {pharmacy.speaking_english ? <span> english</span> : ''}
                    {pharmacy.speaking_chinese ? <span> 中国人</span> : ''}
                    {pharmacy.speaking_japanese ? <span> 日本語</span> : ''}
                </div>
            </div>
        </article>
    );
}