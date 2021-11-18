import { FC } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { WorksheetValue } from 'types';
import { ResponsiveMedia } from 'components/ResponsiveMedia';

interface ResponsiveDropdownProps {
    name: string;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    options: string[] | number[];
    placeholder?: string;
    error?: boolean;
}

export const ResponsiveDropdown: FC<ResponsiveDropdownProps> = ({
    name,
    value,
    setValue,
    options,
    placeholder,
    error,
}) => {
    const defaultText = placeholder || 'Select an option';
    return (
        <>
            <ResponsiveMedia greaterThanOrEqual="DESKTOP">
                <Dropdown
                    value={value}
                    placeholder={defaultText}
                    error={error}
                    selection
                    options={options.map((opt) => ({ text: opt, value: opt }))}
                    style={{ width: '100%' }} // fix for ResponsiveMedia breaking width
                    onChange={(_e, data) =>
                        setValue(data.value as WorksheetValue)
                    }
                />
            </ResponsiveMedia>
            <ResponsiveMedia lessThan="DESKTOP">
                <select
                    className={`styled-select ${
                        value === undefined ? 'placeholder' : ''
                    } ui dropdown selection ${error ? 'error' : ''}`}
                    onChange={(evt) => setValue(evt.target.value)}
                    name={name} // for accessibility
                >
                    <option value={''} hidden>
                        {defaultText}
                    </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </ResponsiveMedia>
        </>
    );
};
