import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Checkbox } from 'semantic-ui-react';
import { DebouncedInput } from 'components/DebouncedInput';
import { ResponsiveDropdown } from 'components/ResponsiveDropdown';

export interface FieldControlProps {
    name: string;
    schema: FieldSchema;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: string;
}

/*<Dropdown
    selection
    options={schema.enum.map((opt) => ({
        text: opt,
        value: opt,
    }))}
    value={value}
    onChange={(_e, data) => setValue(data.value as WorksheetValue)}
    placeholder={schema.placeholder || 'Select an option'}
    error={!!error}
/>*/

export const FieldControl: FC<FieldControlProps> = ({
    name,
    schema,
    value,
    setValue,
    error,
}) =>
    schema.enum ? (
        <ResponsiveDropdown
            name={name}
            value={value}
            setValue={setValue}
            options={schema.enum}
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
