import { useTranslation } from 'react-i18next';
import './Header.css';
import homeIcon from '../images/homeIcon.png';

const lngs = {
  en: { nativeName: 'English' },
  ko: { nativeName: "Korean" },
  cn: { nativeName: 'Chinese' },
  jp: { nativeName: 'Japanese' },
};

export default function Header() {
  const { i18n } = useTranslation();

  return (
    <>
      <header>
        <div>
          <a href="/main">
            <img className="home-icon" src={homeIcon} alt="home"/>
          </a>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
          <a className="title" href="/main">pharamaseoul</a>
        </div>
      </header>
    </>
  );
}

