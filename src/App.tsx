import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { Divider } from 'semantic-ui-react';
import { VERSION } from 'version';
import 'styles/styles.scss';

const startYear = 2021;
const currentYear = new Date().getFullYear();
const copyrightYear =
    currentYear === startYear ? currentYear : `${startYear} - ${currentYear}`;

const App: FC = () => (
    <div className="app-container">
        <div className="app-content">
            <AppRouter />
        </div>
        <footer>
            <Divider />
            {`Version ${VERSION}`}
            <span className="separator">·</span>
            {`© ${copyrightYear} S Clarke`}
            <div>Authorised use by M Hawkswell Contracting Ltd. only.</div>
        </footer>
    </div>
);

export default App;
