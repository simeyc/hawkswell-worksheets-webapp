import { FC } from 'react';
import { Picker } from '@react-native-picker/picker';

interface DropdownProps {
    options: string[] | number[];
    value: string | number;
    setValue: (value: string | number) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, value, setValue }) => (
    <Picker selectedValue={value} onValueChange={(val) => setValue(val)}>
        {options.map((opt) => (
            <Picker.Item label={opt.toString()} value={opt} />
        ))}
    </Picker>
);
