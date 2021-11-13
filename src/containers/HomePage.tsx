import { FC } from 'react';
import { Form, Header, Button, SemanticCOLORS } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getSchemaWorksheetType } from 'utils/schemas';
import schemas from 'schemas';
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
        <Header className="title-text" size="huge">
            M. Hawkswell
        </Header>
        <Header className="subtitle-text" size="large">
            Worksheets Webapp
        </Header>
        <Form.Field>
            <label className="label-div">Select a Worksheet Type:</label>
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
