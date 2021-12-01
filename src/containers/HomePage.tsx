import { FC } from 'react';
import {
    Form,
    Button,
    Header,
    Divider,
    SemanticCOLORS,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getSchemaWorksheetType } from 'utils';
import schemas from 'schemas';
import logo from 'assets/logo512x300.png';
import 'styles/styles.scss';

const COLORS: SemanticCOLORS[] = [
    'orange',
    'purple',
    'teal',
    'yellow',
    'blue',
    'grey',
    'violet',
    'brown',
    'pink',
    'black',
];

export const HomePage: FC = () => (
    <Form>
        <div className="title-div">
            <img src={logo} alt="logo" />
            <Header className="title-text">
                M. Hawkswell Contracting Ltd.
            </Header>
        </div>
        <Divider />
        <Form.Field>
            <label className="homepage-label">Select a Worksheet Type:</label>
            {schemas.map((sch, i) => {
                const worksheetType = getSchemaWorksheetType(sch);
                return (
                    <Link
                        key={worksheetType}
                        to={`/worksheet?type=${worksheetType}`}
                    >
                        <Button
                            className="worksheet-button"
                            content={worksheetType}
                            color={COLORS[i % COLORS.length]}
                        />
                    </Link>
                );
            })}
        </Form.Field>
    </Form>
);
