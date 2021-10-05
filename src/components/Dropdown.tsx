import { FC } from 'react';
import { Picker } from '@react-native-picker/picker';
import { WorksheetValue } from 'types';

interface DropdownProps {
    options: string[] | number[];
    value?: WorksheetValue;
    setValue: (value: WorksheetValue) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, value, setValue }) => (
    <Picker selectedValue={value} onValueChange={(val) => setValue(val)}>
        {value === undefined && <Picker.Item label='-- Select option --' />}
        {options.map((opt) => (
            <Picker.Item key={opt} label={opt.toString()} value={opt}  />
        ))}
    </Picker>
);
