import { useTranslation } from 'react-i18next';

import GreenBag from '../images/NearbySearchPage/greenBag.png';
import Hand from '../images/NearbySearchPage/hand.png';

export default function SearchDesign({ children }){
    const {t} = useTranslation();
    return(
        <div className="nearby-search-design">
            <div className="left-rec">
                <p id="nearby-description">{ children }</p>
                <div id="for-you">{t('description.been-looking-for')}<p id="is-here">{t('description.everything')}</p></div>
            </div>
            <div className="right-rec" />
            <div id="nearby-icon">
                <img className="greenBag" src={GreenBag} />
                <img className="hand" src={Hand} />
            </div>
        </div>
    );
}