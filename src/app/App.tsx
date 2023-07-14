import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import 'shared/lib/i18n';
import './styles/index.css';

const App: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
