import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { withResponsiveMedia } from 'components/ResponsiveMedia';
import 'styles/styles.scss';

const App: FC = () => (
    <div className="app-container">
        <AppRouter />
    </div>
);

export default withResponsiveMedia(App);
