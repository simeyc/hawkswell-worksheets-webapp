import { FC } from 'react';
import { FieldSchema, WorksheetValue } from 'types';
import { Dropdown, Checkbox, Input, Popup } from 'semantic-ui-react';

interface FieldControlProps {
    schema: FieldSchema;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: string;
}

const CtrlComponent: FC<FieldControlProps> = ({
    schema,
    value,
    setValue,
    error,
}) =>
    schema.enum ? (
        // TODO: use radio buttons instead, dropdown schema.enum.length > MAX_RADIO_OPTS?
        <Dropdown
            selection
            options={schema.enum.map((opt) => ({ text: opt, value: opt }))}
            value={value}
            onChange={(_e, data) => setValue(data.value as WorksheetValue)}
            placeholder={schema.placeholder}
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
        <Input
            value={value !== undefined ? value.toString() : ''}
            onChange={(_e, data) => setValue(data.value)}
            placeholder={schema.placeholder}
            error={!!error}
        />
    );

export const FieldControl: FC<FieldControlProps> = ({ error, ...props }) => (
    <Popup
        trigger={<CtrlComponent error={error} {...props} />}
        content={error}
        disabled={!error}
    />
);
