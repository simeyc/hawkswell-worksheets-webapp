import { FC } from 'react';
import { AppRouter } from 'components/AppRouter';
import { Divider } from 'semantic-ui-react';
import { VERSION } from 'version';
import 'styles/styles.scss';

const App: FC = () => (
    <div className="app-container">
        <div className="app-content">
            <AppRouter />
        </div>
        <footer>
            <Divider />
            {`Version ${VERSION}`}
            <span className="separator">·</span>
            {`© ${new Date().getFullYear()} Simon Clarke`}
            <div>Authorised use by M Hawkswell Contracting Ltd. only.</div>
        </footer>
    </div>
);

export default App;
