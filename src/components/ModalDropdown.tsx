import { FC, useState } from 'react';
import {
    Dropdown,
    DropdownProps,
    Modal,
    Segment,
    Radio,
} from 'semantic-ui-react';
import { WorksheetValue } from 'types';
import 'styles/styles.scss';

interface ModalDropdownProps extends DropdownProps {
    setValue: (value: WorksheetValue) => void;
}

export const ModalDropdown: FC<ModalDropdownProps> = ({
    setValue,
    ...props
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuOpen = () => setMenuOpen(!menuOpen);
    const { value, options, placeholder } = props;
    return (
        <>
            <Dropdown
                {...props}
                onOpen={toggleMenuOpen}
                open={false}
                selection
            />
            <Modal open={menuOpen} onClose={toggleMenuOpen} size="tiny">
                <Modal.Content scrolling className="no-padding">
                    <Segment.Group>
                        <Segment
                            className="header"
                            content={placeholder + ':'}
                            size="large"
                        />
                        {options?.map((opt) => (
                            <Segment
                                key={opt.value as string | number}
                                className="dropdown-option"
                                onClick={() => {
                                    setValue(opt.value as WorksheetValue);
                                    toggleMenuOpen();
                                }}
                            >
                                <span className="option-text">{opt.text}</span>
                                <Radio
                                    className="option-icon"
                                    checked={value === opt.value}
                                />
                            </Segment>
                        ))}
                    </Segment.Group>
                </Modal.Content>
            </Modal>
        </>
    );
};
