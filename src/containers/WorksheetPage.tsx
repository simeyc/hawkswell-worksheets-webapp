import { FC, useState, useMemo } from 'react';
import { Text, View, Button } from 'react-native';
import { WorksheetSchema, WorksheetData } from 'types';
import { FieldControl } from 'components/FieldControl';
import Ajv, { ValidateFunction } from 'ajv';
import get from 'lodash.get';

const ajv = new Ajv({ strict: false, allErrors: true });

const parseErrors = (validate: ValidateFunction) => {
    const errors: Record<string, string> = {};
    if (validate.errors) {
        validate.errors.forEach(({ keyword, params, schemaPath }) => {
            if (keyword === 'required') {
                errors[params.missingProperty] = 'Please enter/choose a value';
            } else {
                const pathParts = schemaPath.split('/').slice(1, -1);
                const key = pathParts[pathParts.length - 1];
                const error = get(validate.schema, pathParts.join('.') + '.error');
                errors[key] = error || 'Invalid entry';
            }
        });
    }
    return errors;
};

export const WorksheetPage: FC<{ schema: WorksheetSchema }> = ({ schema }) => {
    const initialData = useMemo(() => {
        const initData: WorksheetData = {};
        Object.entries(schema.properties).forEach(([key, sch]) => {
            const initialVal = sch.default !== undefined ? sch.default : sch.const;
            if (initialVal !== undefined) {
                initData[key] = initialVal;
            }
        });
        return initData;
    }, [schema.properties, schema.hiddenProperties]);
    const [data, setData] = useState<WorksheetData>(initialData);
    const validate = useMemo(() => ajv.compile(schema), [schema]);
    const [valid, errors] = useMemo(() => {
        return [validate(data), parseErrors(validate)];
    }, [data, validate]);
    return (
        <>
            <View>
                <Text>{`New ${schema.name} Worksheet`}</Text>
            </View>
            {Object.entries(schema.properties).map(([key, sch]) => (
                sch.hidden ? null : (<View key={key}>
                    <Text>{key + ':'}</Text>
                    <FieldControl
                        schema={sch}
                        value={data[key]}
                        setValue={value => setData(prev => {
                            const newData = { ...prev };
                            newData[key] = value;
                            return newData;
                        })}
                        error={errors[key]}
                    />
                </View>
            )))}
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
