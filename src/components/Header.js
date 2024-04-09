import { useTranslation } from 'react-i18next';

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