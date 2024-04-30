import React from "react";
import './NearbySearch.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftRectangle from '../images/NearbySearchPage/leftRectangle.png';
import RightRectangle from '../images/NearbySearchPage/rightRectangle.png';
import GreenBag from '../images/NearbySearchPage/greenBag.png';
import Hand from '../images/NearbySearchPage/hand.png';

export default function NearbySearch() {
    return(
        <>
            <Header />
            <div className="nearby-search-design">
                <div className="left-rec">
                    <p id="nearby-description">위치기반 맞춤형 정보 제공</p>
                    <p id="for-you">고객님이 찾던 약국,<p id="is-here">여기 다 있습니다!</p></p>
                </div>
                <div className="right-rec" />
                <div id="nearby-icon">
                    <img className="greenBag" src={GreenBag} />
                    <img className="hand" src={Hand} />
                </div>
            </div>
            <Footer />
        </>
    )
}