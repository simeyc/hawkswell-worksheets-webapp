import { FC } from 'react';
import { FieldSchema, FieldValue } from 'types';
import { Switch, TextInput } from 'react-native';
import { Dropdown } from 'components/Dropdown';

interface FieldControlProps {
    schema: FieldSchema;
    value: FieldValue;
    setValue: (value: FieldValue) => void;
}

// TODO: use default if undefined?
const formatValue = (value: FieldValue) => (value ? value.toString() : '');

export const FieldControl: FC<FieldControlProps> = ({ schema, value, setValue }) => {
    return schema.enum ? (
        // TODO: use radio buttons instead, dropdown schema.enum.length > MAX_RADIO_OPTS?
        <Dropdown
            options={schema.enum}
            value={value}
            setValue={setValue}
        />
    ) : schema.type === 'boolean' ? (
        <Switch value={!!value} onValueChange={setValue} />
    ) : schema.type === 'number' ? (
        <TextInput value={formatValue(value)} onChangeText={val => {
            const num = Number(value);
            setValue(isNaN(num) ? val : num);
        }} />
    ) : (
        <TextInput value={formatValue(value)} onChangeText={setValue} />
    );
};
