import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Switch, TextInput, View, Text } from 'react-native';
import { Dropdown } from 'components/Dropdown';

interface FieldControlProps {
    schema: FieldSchema;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: string;
}

// TODO: use default if undefined?
const formatValue = (value?: WorksheetValue) => (value ? value.toString() : '');

const INTEGER_REGEX = new RegExp('^\\d+$');
const NUMBER_REGEX = new RegExp('^\\d+(\\.\\d+)?$')

export const FieldControl: FC<FieldControlProps> = ({ schema, value, setValue, error }) => {
    return (
        <>
            {schema.enum ? (
                // TODO: use radio buttons instead, dropdown schema.enum.length > MAX_RADIO_OPTS?
                <Dropdown
                    options={schema.enum}
                    value={value}
                    setValue={setValue}
                />
                ) : schema.type === 'boolean' ? (
                    <Switch value={!!value} onValueChange={setValue} />
                ) : (
                    <TextInput 
                        value={formatValue(value)}
                        onChangeText={val => {
                            const castToNumber = (
                                (schema.type === 'integer' && INTEGER_REGEX.test(val)) || 
                                (schema.type === 'number' && NUMBER_REGEX.test(val))
                            );
                            setValue(castToNumber ? Number(val) : val);
                        }}
                        placeholder={schema.placeholder}
                    />
            )}
            {error && (
                <View>
                    <Text>{error}</Text>
                </View>
            )}
        </>
    );
};
