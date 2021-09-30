import { FC, useState, useMemo } from 'react';
import { Text, View, Button } from 'react-native';
import { WorksheetSchema, WorksheetData } from 'types';
import { FieldControl } from 'components/FieldControl';
import Ajv from 'ajv';

const ajv = new Ajv({ strict: false });

export const WorksheetPage: FC<{ schema: WorksheetSchema }> = ({ schema }) => {
    const initialData = useMemo(() => {
        const defaults: WorksheetData = {};
        Object.entries(schema.properties).forEach(([name, sch]) => {
            if (sch.default) {
                defaults[name] = sch.default;
            }
        });
        return defaults;
    }, [schema.properties]);
    const [data, setData] = useState<WorksheetData>(initialData);
    const validate = useMemo(() => ajv.compile(schema), [schema]);
    const [valid, errors] = useMemo(() => {
        // TODO validate data against schema, pass errors to FieldControls
        validate(data);
        console.log({ data, ajv, errors: ajv.errors });
        return [validate(data), {}];
    }, [data, validate]);
    return (
        <>
            <View>
                <Text>{`New ${schema.name} Worksheet`}</Text>
            </View>
            {Object.entries(schema.properties).map(([name, sch]) => (
                <View key={name}>
                    <Text>{name + ':'}</Text>
                    <FieldControl
                        schema={sch}
                        value={data[name]}
                        setValue={value => setData(prev => {
                            const newData = { ...prev };
                            if (value === undefined) {
                                delete newData[name];
                            } else {
                                newData[name] = value;
                            }
                            return newData;
                        })}
                    />
                </View>
            ))}
            <View>
                {valid ? (
                    <Button
                        title='Share'
                        color='green'
                        onPress={() => {
                            console.log('TODO: open share tray');
                        }}
                    />
                 ) : (
                    <Button title='Worksheet incomplete' disabled onPress={() => {}} />
                 )}
            </View>
        </>
    );
};
