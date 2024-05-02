import GreenBag from '../images/NearbySearchPage/greenBag.png';
import Hand from '../images/NearbySearchPage/hand.png';

export default function SearchDesign({ children }){
    return(
        <div className="nearby-search-design">
            <div className="left-rec">
                <p id="nearby-description">{ children }</p>
                <div id="for-you">고객님이 찾던 약국,<p id="is-here">여기 다 있습니다!</p></div>
            </div>
            <div className="right-rec" />
            <div id="nearby-icon">
                <img className="greenBag" src={GreenBag} />
                <img className="hand" src={Hand} />
            </div>
        </div>
    );
}