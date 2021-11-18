import { FC } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { WorksheetValue } from 'types';
import { ResponsiveMedia } from 'components/ResponsiveMedia';
import { MobileDropdown } from 'components/MobileDropdown';

interface ResponsiveDropdownProps {
    name: string;
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
    options: string[] | number[];
    placeholder?: string;
    error?: boolean;
}

export const ResponsiveDropdown: FC<ResponsiveDropdownProps> = ({
    value,
    setValue,
    options,
    placeholder,
    error,
}) => {
    const commonProps: DropdownProps = {
        value,
        placeholder: placeholder || 'Select an option',
        error,
        selection: true,
        options: options.map((opt) => ({ text: opt, value: opt })),
        style: { width: '100%' }, // fix for ResponsiveMedia breaking width
    };
    return (
        <>
            <ResponsiveMedia greaterThanOrEqual="DESKTOP">
                <Dropdown
                    {...commonProps}
                    onChange={(_e, data) =>
                        setValue(data.value as WorksheetValue)
                    }
                />
            </ResponsiveMedia>
            <ResponsiveMedia lessThan="DESKTOP">
                <MobileDropdown
                    {...commonProps}
                    setValue={(val) => setValue(val as WorksheetValue)}
                />
            </ResponsiveMedia>
        </>
    );
};
