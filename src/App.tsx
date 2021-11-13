import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import 'styles/App.css';

const App: FC = () => (
    <div style={{ maxWidth: '500px', margin: '0px auto' }}>
        <div style={{ margin: '20px' }}>
            <AppRouter />
        </div>
    </div>
);

export default App;
