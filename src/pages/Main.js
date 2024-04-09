import React from 'react';

import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Footer from '../components/Footer.js';

export default function Main() {
    return (
        <>
            <Header />
            <h1>Pharmacy</h1>
            <Map />
            <Footer />
        </>
    )
}