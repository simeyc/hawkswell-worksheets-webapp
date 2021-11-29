import { FC, useState } from 'react';
import { Input, Modal } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
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
    ...inputProps
}) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
    return (
        <>
            <Input
                className="modal-trigger"
                {...inputProps}
                value={value}
                onFocus={toggleOpen}
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
                    />
                </Modal.Content>
            </Modal>
        </>
    );
};
