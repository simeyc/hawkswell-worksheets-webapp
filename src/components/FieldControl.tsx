import { FC, useState } from 'react';
import { FieldSchema, DataValue } from 'types';
import { Switch, TextInput } from 'react-native';
import { Dropdown } from 'components/Dropdown';

// TODO: use default if undefined?
// TDOO: handle validation, casting from string
const formatValue = (value: DataValue) => (value ? value.toString() : '');

export const FieldControl: FC<{ schema: FieldSchema }> = ({ schema }) => {
    const [value, setValue] = useState<DataValue>();
    return schema.enum ? (
        <Dropdown
            options={schema.enum}
            value={formatValue(value)}
            setValue={setValue}
        />
    ) : schema.type === 'boolean' ? (
        <Switch value={!!value} onValueChange={setValue} />
    ) : (
        <TextInput value={formatValue(value)} onChangeText={setValue} />
    );
};
