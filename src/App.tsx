import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { withResponsiveMedia } from 'components/ResponsiveMedia';
import package_json from '../package.json';
import 'styles/styles.scss';

const App: FC = () => (
    <>
        <div className="app-container">
            <AppRouter />
        </div>
        <span>Version: {package_json.version}</span>
    </>
);

export default withResponsiveMedia(App);
