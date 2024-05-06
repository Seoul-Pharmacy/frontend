import React, { useState, useEffect } from 'react';
import Summarize from "./Summarize";
import Detail from "./Detail";

export default function NearbyResult({ result }) {
    const [ identifier, setIdentifier ] = useState(null);
    
    useEffect(() => {
        if (result.length > 0) {
            setIdentifier(result[0].id);
        }
    }, [result]);

    const handleSelectPharmacy = (id) => {
        setIdentifier(id);
    };

    return (
        <div id="result-wrapper">
        <div id="result-summarize-wrapper">
            <ul id="result-summarize-inner-wrapper">
                {result.map(pharmacy => (
                    <li
                        key={pharmacy.id}
                        className="pharmacy-list-item"
                        onClick={() => handleSelectPharmacy(pharmacy.id)}
                        id={identifier === pharmacy.id ? "selected" : ""}
                    >
                        <Summarize 
                            id="nearby-summarize"
                            name={pharmacy.name}
                            distance={pharmacy.distance}
                            si={pharmacy.si}
                            gu={pharmacy.gu}
                            road_name_address={pharmacy.road_name_address}
                            speaking_english={pharmacy.speaking_english}
                            speaking_chinese={pharmacy.speaking_chinese}
                            speaking_japanese={pharmacy.speaking_japanese}
                        />
                    </li>
                ))}
            </ul>
        </div>
        <Detail identifier={identifier} />
    </div>
    )
}