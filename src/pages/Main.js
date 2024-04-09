import React from 'react';

import './Main.css';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Search from '../components/Search.js';
import Footer from '../components/Footer.js';

export default function Main() {
    return (
        <>
            <header className="mainHeader"><Header /></header>
            <Search />
            <Footer />
        </>
    )
}