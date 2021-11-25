import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Checkbox } from 'semantic-ui-react';
import { DebouncedInput } from 'components/DebouncedInput';
import { ModalDropdown } from 'components/ModalDropdown';

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
            selection
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
            error={error}
            autoCapitalize="words"
        />
    );
