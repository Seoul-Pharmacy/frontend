import React, { useEffect, useState } from 'react';
import apiDetails from '../../api/apiDetail';
import Map from "../map/Map";
import nearbyApi from '../../api/nearbyApi';

export default function Detail({ id }) {
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        nearbyApi(id).then(data => {
            if (data) {
                setPharmacy(data);
            } else {
                setError('Failed to load pharmacy details.');
            }
            setLoading(false);
        })
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pharmacy) return <div>No data found.</div>;

    return (
        <article id="result-details">
            <Map/>
            <div id="result-details-text-wrapper">
                <h1 id="result-details-name">약국 이름: {pharmacy.results.name}</h1>
                <div id="result-details-name">주소</div>
                <div id="result-details-name">영업시간</div>
                <div id="result-details-GEN">전화번호</div>
                <div id="result-details-distance">거리</div>
            </div>
        </article>
    );
}