import { FC } from 'react';
import { Button, Form } from 'semantic-ui-react';
import schemas from 'schemas';
import { useNavContext } from 'App';
import { WorksheetPage } from 'containers/WorksheetPage';

export const NewWorksheetPage: FC = () => {
    const setPage = useNavContext();
    return (
        <Form>
            <Form.Field>
            <label>Select Worksheet Type:</label>
            {schemas.map((sch) => {
                const jobType = sch.properties["Job Type"].const;
                return (
                    <Button
                        key={jobType}
                        content={jobType}
                        onClick={() => {
                            setPage(<WorksheetPage schema={sch} />);
                        }}
                    />
                );
            })}
            </Form.Field>
        </Form>
    );
};
