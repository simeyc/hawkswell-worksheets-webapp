import { FC, useEffect } from 'react';
import { HomePage } from 'containers/HomePage';
import { WorksheetPage } from 'containers/WorksheetPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import schemas from 'schemas';
import { getSchemaWorksheetType } from 'utils/schemas';
import qs from 'querystring';

const ScrollingRoute: FC<RouteProps> = (props) => {
    useEffect(() => {
        console.log('SCROLLING');
        window.scrollTo(0, 0);
    }, [props.location]);
    return <Route {...props} />;
};

export const AppRouter: FC = () => (
    <Router>
        <Switch>
            <ScrollingRoute exact path="/">
                <HomePage />
            </ScrollingRoute>
            <ScrollingRoute
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
