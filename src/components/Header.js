import { useTranslation } from 'react-i18next';
import './Header.css';

const lngs = {
  en: { nativeName: 'English' },
  ko: { nativeName: "Korean" },
  cn: { nativeName: 'Chinese' },
  jp: { nativeName: 'Japanese' },
};

export default function Header() {
  const { i18n } = useTranslation();

  return (
    <div className="App">
      <header>
        <div>
          <a href="/main"><h1>로고</h1></a>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

