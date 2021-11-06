import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Dropdown, Checkbox } from 'semantic-ui-react';
import { DebouncedInput } from 'components/DebouncedInput';

export interface FieldControlProps {
    schema: FieldSchema;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: string;
}

export const FieldControl: FC<FieldControlProps> = ({
    schema,
    value,
    setValue,
    error,
}) =>
    schema.enum ? (
        // TODO: use radio buttons instead, dropdown schema.enum.length > MAX_RADIO_OPTS?
        <Dropdown
            selection
            options={schema.enum.map((opt) => ({
                text: opt,
                value: opt,
            }))}
            value={value}
            onChange={(_e, data) => setValue(data.value as WorksheetValue)}
            placeholder={schema.placeholder || 'Select an option'}
            error={!!error}
        />
    ) : schema.type === 'boolean' ? (
        // TODO: dropdown or radio buttons?
        <Checkbox
            toggle
            checked={!!value}
            onChange={(_e, data) => setValue(!!data.checked)}
        />
    ) : (
        <DebouncedInput
            value={value}
            setValue={setValue}
            placeholder={schema.placeholder || 'Enter a value'}
            error={!!error}
        />
    );
