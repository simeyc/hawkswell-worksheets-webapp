import { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { WorksheetSchema } from 'types';
import { FieldControl } from 'components/FieldControl';

export const WorksheetPage: FC<{ schema: WorksheetSchema }> = ({ schema }) => {
    const [data, setData] = useState<Record<string, string | number>>({});
    return (
        <>
            <View>
                <Text>{`New ${schema.name} Worksheet`}</Text>
            </View>
            {schema.properties.map((sch) => (
                <View>
                    <Text>{sch.name + ':'}</Text>
                    <FieldControl schema={sch} />
                </View>
            ))}
        </>
    );
};
