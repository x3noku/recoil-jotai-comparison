import { useTranslation } from 'react-i18next';
import { CreateJotaiPostInput } from './CreateJotaiPostInput';
import { CreateRecoilPostInput } from './CreateRecoilPostInput';

const MainPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={'flex flex-col gap-y-4'}>
            <span className={'text-2xl'}>{t('Welcome to React App')}</span>
            <CreateRecoilPostInput />
            <CreateJotaiPostInput />
        </div>
    );
};

export default MainPage;
