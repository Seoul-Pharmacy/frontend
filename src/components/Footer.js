import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header>
        <p>{t('description.GEN')}</p>
        <p>{t('description.GroupName')}</p>
        <p>{t('description.Insta')}</p>
        <p>{t('description.Email')}</p>
      </header>
    </div>
  );
}