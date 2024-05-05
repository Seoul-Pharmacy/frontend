import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apiDetail from '../../api/apiDetail';
import Map from "../map/Map";

export default function Detail({ identifier }) {
    const {t} = useTranslation();
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (identifier) {
            apiDetail(identifier).then(data => {
                if (data) {
                    setPharmacy(data);
                    setError(null);
                } else {
                    setError('약국 정보를 불러오는 데 실패했습니다.');
                }
                setLoading(false);
            }).catch(error => {
                setError(error);
                setLoading(false);
            });
        }
    }, [identifier]);

    if (loading) return (
        <article id="result-details">
            <div id="result-details-text-wrapper">
                loading...
            </div>
        </article>
    );
    if (error) return (
        <article id="result-details">
            <div id="result-details-text-wrapper">
                error: {error}
            </div>
        </article>
    )
    if (!pharmacy) return (
        <article id="result-details">
            <div id="result-details-text-wrapper">
                No pharmacy choosed.
            </div>
        </article>
    );

    return (
        <article id="result-details">
            <Map lat={parseFloat(pharmacy.latitude)} lng={parseFloat(pharmacy.longitude)} />
            <div id="result-details-text-wrapper">
                <h1 id="result-details-name">{t('description.pharmacy-name')} | {pharmacy.name}</h1>
                <div id="result-details-name">{t('description.address')} | {pharmacy.si} {pharmacy.gu} {pharmacy.road_name_address} </div>
                <div id="result-details-name">{t('description.bussiness-hours')} | {t('description.mon')}: {pharmacy.mon_open_time}~{pharmacy.mon_close_time}
                <p>{t('description.tue')}: {pharmacy.tue_open_time}~{pharmacy.tue_close_time}</p>
                <p>{t('description.wed')}: {pharmacy.wed_open_time}~{pharmacy.wed_close_time}</p></div>
                <p>{t('description.thu')}: {pharmacy.thu_open_time}~{pharmacy.thu_close_time}</p>
                <p>{t('description.fri')}: {pharmacy.fri_open_time}~{pharmacy.fri_close_time}</p>
                <p>{t('description.sat')}: {pharmacy.sat_open_time}~{pharmacy.sat_close_time}</p>
                <p>{t('description.sun')}: {pharmacy.sun_open_time}~{pharmacy.sun_close_time}</p>
                <p>{t('description.holiday')}: {pharmacy.holiday_open_time}~{pharmacy.holiday_close_time}</p>
                <div id="result-details-GEN">{t('description.number')} | {pharmacy.main_number}</div>
            </div>
        </article>
    );
}