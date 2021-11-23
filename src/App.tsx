import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { withResponsiveMedia } from 'components/ResponsiveMedia';
import { Divider } from 'semantic-ui-react';
import 'styles/styles.scss';

const App: FC = () => (
    <div className="app-container">
        <div style={{ flex: 1 }}>
            <AppRouter />
        </div>
        <span className="footer-div">
            <Divider />
            {`Version: ${'TODO'}`}
            <span className="footer-separator">·</span>
            {`© ${new Date().getFullYear()} Simon Clarke`}
        </span>
    </div>
);

export default withResponsiveMedia(App);
