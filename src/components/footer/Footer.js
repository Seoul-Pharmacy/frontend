import {useTranslation} from 'react-i18next';
import './Footer.css';
import React from "react";

import kakaoIMG from '../../images/footer/kakao.png';
import instaIMG from '../../images/footer/insta.png';

const FOOTER_TEXT = {
    "owner": "윤찬호",
    "GEN": "010-4158-7384",
    "groupName": "어디약? 여기약!",
    "insta": "https://www.instagram.com/pharmaseoul__/",
    "email": "pharmaseoul@naver.com",
    "kakao": "https://open.kakao.com/o/s90lU0og",
}


export default function Footer() {
    const {t} = useTranslation();

    return (
        <footer>
            <p>pharmaseoul</p>
            <p>{t('owner')} <span className='footer-item'>{FOOTER_TEXT.owner}</span></p>
            <p>{t('groupName')} <span className='footer-item'>{FOOTER_TEXT.groupName}</span></p>
            <p>{t('GEN')} <span className='footer-item'>{FOOTER_TEXT.GEN}</span></p>
            <p>{t('email')} <span className='footer-item'>{FOOTER_TEXT.email}</span></p>

            <div id="contact-div">
                <a
                    href={FOOTER_TEXT.kakao}>
                    <img className="contact-button"
                         src={kakaoIMG} alt="kakao"/>
                </a>

                <a
                    href={FOOTER_TEXT.insta}>
                    <img className="contact-button"
                         src={instaIMG} alt="insta"/>
                </a>
            </div>
        </footer>
    );
}