import React, { useEffect, useState } from 'react';
import apiDetail from '../../api/apiDetail';
import Map from "../map/Map";

export default function Detail({ identifier }) {
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
            }).catch(err => {
                setError('네트워크 오류가 발생했습니다.');
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
                <h1 id="result-details-name">약국 이름 | {pharmacy.name}</h1>
                <div id="result-details-name">주소 | {pharmacy.si} {pharmacy.gu} {pharmacy.road_name_address} </div>
                <div id="result-details-name">영업시간 | 월요일: {pharmacy.mon_open_time}~{pharmacy.mon_close_time}
                <p>화요일: {pharmacy.tue_open_time}~{pharmacy.tue_close_time}</p>
                <p>수요일: {pharmacy.wed_open_time}~{pharmacy.wed_close_time}</p></div>
                <p>목요일: {pharmacy.thu_open_time}~{pharmacy.thu_close_time}</p>
                <p>금요일: {pharmacy.fri_open_time}~{pharmacy.fri_close_time}</p>
                <p>토요일: {pharmacy.sat_open_time}~{pharmacy.sat_close_time}</p>
                <p>일요일: {pharmacy.sun_open_time}~{pharmacy.sun_close_time}</p>
                <p>공휴일: {pharmacy.holiday_open_time}~{pharmacy.holiday_close_time}</p>
                <div id="result-details-GEN">전화번호 | {pharmacy.main_number}</div>
            </div>
        </article>
    );
}