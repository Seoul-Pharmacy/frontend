import React, { useState, useEffect } from 'react';
import Summarize from "./Summarize";
import Detail from "./Detail";

export default function Result({ result }) {
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
                        className="pharmacy-list-item"
                        onClick={() => handleSelectPharmacy(pharmacy.id)}
                        id={identifier === pharmacy.id ? "selected" : ""}
                    >
                        <Summarize
                            key={pharmacy.id}
                            name={pharmacy.name}
                            distance={pharmacy.distance} />
                    </li>
                ))}
            </ul>
        </div>
        <Detail identifier={identifier} />
    </div>
    )
}