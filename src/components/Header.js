import { useTranslation } from 'react-i18next';
import './Header.css';
import homeIcon from '../images/homeIcon.png';

const lngs = {
  en: { nativeName: 'English' },
  ko: { nativeName: '한국어' },
  cn: { nativeName: '华侨华人' },
  jp: { nativeName: '日本語です' },
};

export default function Header() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <header>
        <div className="header-content">
          <a href="/main">
            <img className="home-icon" src={homeIcon} alt="home"/>
          </a>
          <select onChange={handleLanguageChange} className="language-select" value={i18n.resolvedLanguage}>
            {Object.keys(lngs).map((lng) => (
              <option key={lng} value={lng}>{lngs[lng].nativeName}</option>
            ))}
          </select>
          <a className="title" href="/main">PharmaSeoul</a>
        </div>
      </header>
    </>
  );
}