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
            <div className="nearbySearchDesign">
                <img className="leftRec" src={LeftRectangle} />
                <img className="rightRec" src={RightRectangle} />
                <img className="greenBag" src={GreenBag} />
                <img className="hand" src={Hand} />
            </div>
            <Footer />
        </>
    )
}