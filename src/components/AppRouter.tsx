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
import qs from 'querystring';

export const AppRouter: FC = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route
                exact
                path="/worksheet"
                render={({ location }) => {
                    const { type: worksheetType } = qs.parse(
                        location.search.slice(1)
                    );
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
