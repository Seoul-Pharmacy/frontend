import React from "react";
import './NearbySearch.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Summarize from "../components/Summarize";
import Map from "../components/Map"

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
            <div id="result-wrapper">
                <div id="result-text">
                    <p>내 주변에 있는, 지금 영업중인</p>
                    <h1>가까운 약국을 알려드려요!</h1>
                </div>
                <div id="search-wrapper">
                    검색창 위치
                </div>
                <div id="result-inner-wrapper">
                    <div id="result-summarize-wrapper">
                        <Summarize />
                        <Summarize />
                        <Summarize />
                        <Summarize />
                        <Summarize />
                    </div>
                    <article id="result-details">
                        <h1>약국 이름</h1>
                        <p>주소</p>
                        <p>영업시간</p>
                        <p>전화번호</p>
                        <p>거리</p>
                        <Map />
                    </article>
                </div>
            </div>
            <Footer />
        </>
    )
}