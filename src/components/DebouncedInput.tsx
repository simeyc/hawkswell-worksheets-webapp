import { FC, useState, useEffect } from 'react';
import { Input, InputProps } from 'semantic-ui-react';
import { useDebounce } from 'use-debounce';
import { WorksheetValue } from 'types';

interface DebouncedInputProps extends InputProps {
    value?: WorksheetValue;
    setValue: (value: string) => void;
}

export const DebouncedInput: FC<DebouncedInputProps> = ({
    value,
    setValue,
    ...inputProps
}) => {
    const stringValue = value !== undefined ? value.toString() : '';
    const [editedValue, setEditedValue] = useState(stringValue);
    const [debouncedValue] = useDebounce(editedValue, 500);
    useEffect(() => {
        editedValue !== stringValue && setEditedValue(stringValue);
    }, [stringValue]);
    useEffect(() => {
        debouncedValue !== stringValue && setValue(debouncedValue);
    }, [debouncedValue]);
    return (
        <Input
            {...inputProps}
            value={editedValue}
            onChange={(_e, data) => setEditedValue(data.value)}
        />
    );
};
