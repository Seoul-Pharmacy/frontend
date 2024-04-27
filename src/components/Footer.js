import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer>
        <p>{t('description.GEN')}</p>
        <p>{t('description.GroupName')}</p>
        <p>{t('description.Insta')}</p>
        <p>{t('description.Email')}</p>
      </footer>
    </>
  );
}