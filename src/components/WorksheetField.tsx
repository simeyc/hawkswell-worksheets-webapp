import { FC, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { FieldSchema, WorksheetValue } from 'types';
import { FieldControl } from 'components/FieldControl';
import { ErrorMessage } from 'components/ErrorMessage';
import 'styles/styles.scss';

interface WorksheetFieldProps {
    title: string;
    schema: FieldSchema;
    value: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    error?: string;
    forceShowError?: boolean;
}

export const WorksheetField: FC<WorksheetFieldProps> = ({
    title,
    schema,
    value,
    setValue,
    error,
    forceShowError,
}) => {
    const [showError, setShowError] = useState(false);
    const err = showError || forceShowError ? error : '';
    return schema.hidden ? null : (
        // prevent error affecting dropdown menu formatting
        <Form.Field error={!schema.enum && !!err}>
            <label>{title + ':'}</label>
            <ErrorMessage error={err} />
            <FieldControl
                schema={schema}
                value={value}
                setValue={(value) => {
                    setShowError(true);
                    setValue(value);
                }}
                error={err}
            />
        </Form.Field>
    );
};
