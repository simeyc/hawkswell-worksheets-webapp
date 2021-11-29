import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Checkbox } from 'semantic-ui-react';
import { DebouncedInput } from 'components/DebouncedInput';
import { ModalDropdown } from 'components/ModalDropdown';
import { DatePicker } from 'components/DatePicker';

export interface FieldControlProps {
    schema: FieldSchema;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: boolean;
}

export const FieldControl: FC<FieldControlProps> = ({
    schema,
    value,
    setValue,
    error,
}) =>
    schema.enum ? (
        <ModalDropdown
            value={value}
            setValue={setValue}
            options={schema.enum.map((opt) => ({ value: opt, text: opt }))}
            placeholder={schema.placeholder || 'Select an option'}
            error={error}
        />
    ) : schema.type === 'boolean' ? (
        // TODO: dropdown or radio buttons?
        <Checkbox
            toggle
            checked={!!value}
            onChange={(_e, data) => setValue(!!data.checked)}
        />
    ) : schema.type === 'string' && schema.subType === 'date' ? (
        <DatePicker
            value={value as string}
            setValue={setValue}
            placeholder={schema.placeholder || 'Pick a date'}
            error={error}
        />
    ) : (
        <DebouncedInput
            value={value}
            setValue={setValue}
            placeholder={schema.placeholder || 'Enter a value'}
            error={error}
            autoCapitalize="words"
        />
    );
