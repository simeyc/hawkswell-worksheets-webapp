import { FC } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import schemas from 'schemas';
import { getSchemaWorksheetType } from 'utils/schemas';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
    let username = localStorage.getItem('username');
    username = username ? ' ' + username : '';
    return (
        <Form>
            <Header>M Hawkswell Contracting Ltd</Header>
            <div>{`Hi${username}, welcome to the Worksheets Webapp!`}</div>
            <Form.Field>
                <label>Select Worksheet Type:</label>
                {schemas.map((sch) => {
                    const worksheetType = getSchemaWorksheetType(sch);
                    return (
                        <Link key={worksheetType} to={'/' + worksheetType}>
                            <Button content={worksheetType} />
                        </Link>
                    );
                })}
            </Form.Field>
        </Form>
    );
};
