import React, {useState} from 'react';
import './NearbySearch.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Summarize from "../components/Summarize";
import Map from "../components/map/Map"

import GreenBag from '../images/NearbySearchPage/greenBag.png';
import Hand from '../images/NearbySearchPage/hand.png';
import LocationIcon from '../images/NearbySearchPage/locationIcon.png';
import Arrow from '../images/NearbySearchPage/dropDownArrow.png';
import Time from '../images/NearbySearchPage/timeIcon.png';

export default function NearbySearch() {
    const [timeDropdownMode, setTimeDropDownMode] = useState(false);
    const [guDropdownMode, setGuDropdownMode] = useState(false);

    const openDropdown = (dropdownName, isOpen, setIsOpen) => {
        let content;
        if (dropdownName === 'si') {
            content = document.getElementById("si-dropdown");
        } else {
            content = document.getElementById("time-dropdown");
        }

        if (!isOpen) {
            content.style.display = 'block';
            setIsOpen(true);
            return;
        }

        content.style.display = 'none';
        setIsOpen(false);
    };


    return (
        <>
            <Header/>
            <div className="nearby-search-design">
                <div className="left-rec">
                    <p id="nearby-description">위치기반 맞춤형 정보 제공</p>
                    <p id="for-you">고객님이 찾던 약국,<p id="is-here">여기 다 있습니다!</p></p>
                </div>
                <div className="right-rec"/>
                <div id="nearby-icon">
                    <img className="greenBag" src={GreenBag}/>
                    <img className="hand" src={Hand}/>
                </div>
            </div>

            <div id="search-wrapper">
                <div id="result-explanation-text">
                    <p id="result-explanation-inner-text1">내 주변에 있는, 지금 영업중인</p>
                    <h1 id="result-explanation-inner-text2">가까운 약국을 알려드려요!</h1>
                </div>
                <div id="search-inner-wrapper">
                    {/*<input type="text" placeholder="약국 이름 검색"/>*/}
                    {/*<button type="submit">검색</button>*/}

                    <div className="dropdown">
                        <button onClick={() => {
                            openDropdown('si', guDropdownMode, setGuDropdownMode)
                        }} className="dropdown-button">
                            <img className="location-icon" src={LocationIcon} alt=""/>
                            군/구
                            <img className="arrow-icon" src={Arrow} alt=""/>
                        </button>
                        <div id="si-dropdown" className="dropdown-content">
                            <div className="dropdown-item">profile</div>
                            <div className="dropdown-item">write a post</div>
                            <div className="dropdown-item">settings</div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button onClick={() => {
                            openDropdown('time', timeDropdownMode, setTimeDropDownMode)
                        }} className="dropdown-button">
                            <img className="location-icon" src={Time} alt=""/>
                            영업시간
                            <img className="arrow-icon" src={Arrow} alt=""/>
                        </button>
                        <div id="time-dropdown" className="dropdown-content">
                            <div className="dropdown-item">profile</div>
                            <div className="dropdown-item">write a post</div>
                            <div className="dropdown-item">settings</div>
                        </div>
                    </div>
                    <div id="language-checkbox-wrapper">
                        <input id="speaking-japanese" type="checkbox"/>
                        <label id="speaking-japanese-label" className="language-checkbox" htmlFor="speaking-japanese">일본어 가능</label>
                        <input id="speaking-chinese" type="checkbox"/>
                        <label id="speaking-chinese-label" className="language-checkbox" htmlFor="speaking-chinese">중국어 가능</label>
                        <input id="speaking-english" type="checkbox"/>
                        <label id="speaking-english-label" className="language-checkbox" htmlFor="speaking-english">영어 가능</label>
                    </div>


                    <button id="pharmacy-search-button">검색</button>
                </div>
            </div>

            <div id="result-wrapper">
                <div id="result-summarize-wrapper">
                    <ul id="result-summarize-inner-wrapper">
                        <Summarize/>
                        <Summarize/>
                        <Summarize/>
                        <Summarize/>
                        <Summarize/>
                    </ul>
                    <div className="page_wrap">
                        <div className="page_nation">
                            <a className="arrow pprev" href="#"></a>
                            <a className="arrow prev" href="#"></a>
                            <a href="#" className="active">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#">6</a>
                            <a href="#">7</a>
                            <a href="#">8</a>
                            <a href="#">9</a>
                            <a href="#">10</a>
                            <a className="arrow next" href="#"></a>
                            <a className="arrow nnext" href="#"></a>
                        </div>
                    </div>
                </div>

                <article id="result-details">
                    <Map/>
                    <div id="result-details-text-wrapper">
                        <h1 id="result-details-name">약국 이름</h1>
                        <div id="result-details-name">주소</div>
                        <div id="result-details-name">영업시간</div>
                        <div id="result-details-GEN">전화번호</div>
                        <div id="result-details-distance">거리</div>
                    </div>
                </article>
            </div>
            <Footer/>
        </>
    )
}