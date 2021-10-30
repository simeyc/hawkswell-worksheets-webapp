import { FC } from 'react';
import { HomePage } from 'containers/HomePage';
import { WorksheetPage } from 'containers/WorksheetPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import schemas from 'schemas';
import { getSchemaWorksheetType } from 'utils/schemas';
import 'styles/App.css';

const AppRouter: FC = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route
                exact
                path="/:worksheetType"
                render={({ match }) => {
                    const { worksheetType } = match.params;
                    const schema = schemas.find(
                        (sch) => getSchemaWorksheetType(sch) === worksheetType
                    );
                    return schema ? (
                        <WorksheetPage schema={schema} />
                    ) : (
                        <Redirect to="/" />
                    );
                }}
            />
            <Redirect to="/" />
        </Switch>
    </Router>
);

const App: FC = () => (
    <div style={{ background: '#e9ffdb' }}>
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <AppRouter />
        </div>
    </div>
);

export default App;
