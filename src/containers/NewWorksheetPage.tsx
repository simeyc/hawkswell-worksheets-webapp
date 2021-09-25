import { FC } from 'react';
import { Button, Text } from 'react-native';
import schemas from 'schemas';
import { useNavContext } from 'App';
import { WorksheetPage } from 'containers/WorksheetPage';

export const NewWorksheetPage: FC = () => {
    const setPage = useNavContext();
    return (
        <>
            <Text>Select Worksheet Type:</Text>
            {schemas.map((sch) => (
                <Button
                    title={sch.name}
                    onPress={() => {
                        setPage(<WorksheetPage schema={sch} />);
                    }}
                />
            ))}
        </>
    );
};
