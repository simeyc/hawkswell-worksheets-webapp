import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { withResponsiveMedia } from 'components/ResponsiveMedia';
import { Divider } from 'semantic-ui-react';
import 'styles/styles.scss';

const App: FC = () => (
    <div className="app-container">
        <div className="app-content">
            <AppRouter />
        </div>
        <footer>
            <Divider />
            {`Version ${'TODO'}`}
            <span className="separator">·</span>
            {`© ${new Date().getFullYear()} Simon Clarke`}
        </footer>
    </div>
);

export default withResponsiveMedia(App);
