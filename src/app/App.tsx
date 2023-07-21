import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { router } from './router';

import 'shared/lib/i18n';
import './styles/index.css';

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
};

export default App;
