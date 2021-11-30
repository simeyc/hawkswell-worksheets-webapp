import { FC, useState, useMemo } from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { formatDate } from 'utils';
import 'styles/styles.scss';

interface DatePickerProps {
    value?: string;
    setValue: (value: string) => void;
    placeholder?: string;
    error?: boolean;
}

export const DatePicker: FC<DatePickerProps> = ({
    value,
    setValue,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
    const [minDate, maxDate] = useMemo(() => {
        const date = new Date();
        const max = formatDate(date);
        date.setFullYear(date.getFullYear() - 1);
        return [formatDate(date), max];
    }, []);
    return (
        <>
            <Dropdown
                className="datepicker-dropdown"
                {...props}
                value={value}
                options={[{ value, text: value }]}
                onOpen={toggleOpen}
                open={false}
                selection
                icon="calendar alternate"
            />
            <Modal open={open} onClose={toggleOpen} size="tiny">
                <Modal.Content className="no-padding">
                    <DateInput
                        value={value || ''}
                        onChange={(_evt, data) => {
                            setValue(data.value);
                            toggleOpen();
                        }}
                        inline
                        dateFormat="DD/MM/YYYY"
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </Modal.Content>
            </Modal>
        </>
    );
};
