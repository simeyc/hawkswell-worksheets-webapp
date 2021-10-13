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

export const FieldControl: FC<FieldControlProps> = ({ schema, value, setValue, error }) => {
    return (
        <>
            {error && (
                <View>
                    <Text>{error}</Text>
                </View>
            )}
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
                        value={value !== undefined ? value.toString() : ''}
                        onChangeText={setValue}
                        placeholder={schema.placeholder}
                    />
            )}
        </>
    );
};
