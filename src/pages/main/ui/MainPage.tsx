import { useTranslation } from 'react-i18next';

const MainPage: React.FC = () => {
    const { t } = useTranslation();

    return <span className={'text-2xl'}>{t('Welcome to React App')}</span>;
};

export default MainPage;
