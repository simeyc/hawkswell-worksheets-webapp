import { FC } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { WorksheetValue } from 'types';
import { ResponsiveMedia } from 'components/ResponsiveMedia';
import 'styles/styles.scss';

interface ResponsiveDropdownProps {
    name: string;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    options: string[] | number[];
    placeholder: string;
    error?: boolean;
}

export const ResponsiveDropdown: FC<ResponsiveDropdownProps> = ({
    name,
    value,
    setValue,
    options,
    placeholder,
    error,
}) => (
    <>
        <ResponsiveMedia greaterThanOrEqual="DESKTOP">
            <Dropdown
                value={value}
                placeholder={placeholder}
                error={error}
                options={options.map((opt) => ({ text: opt, value: opt }))}
                selection
                style={{ width: '100%' }} // fix for ResponsiveMedia breaking width
                onChange={(_e, data) => setValue(data.value as WorksheetValue)}
            />
        </ResponsiveMedia>
        <ResponsiveMedia lessThan="DESKTOP">
            <select
                className={`styled-select ${
                    value === undefined ? 'placeholder' : ''
                } ui dropdown selection ${error ? 'error' : ''}`}
                onChange={(evt) => setValue(evt.target.value)}
                name={name} // for accessibility
                value={value as string | number | undefined}
            >
                <option value={''} hidden>
                    {placeholder}
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
