import { FC, useState } from 'react';
import { Dropdown, DropdownProps, Modal, Segment } from 'semantic-ui-react';
import 'styles/styles.scss';

interface MobileDropdownProps extends DropdownProps {
    setValue: (val: DropdownProps['value']) => void;
}

export const MobileDropdown: FC<MobileDropdownProps> = ({
    setValue,
    ...props
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuOpen = () => setMenuOpen(!menuOpen);
    const { options } = props;
    return (
        <>
            <Dropdown {...props} onOpen={toggleMenuOpen} open={false} />
            <Modal open={menuOpen} onClose={toggleMenuOpen}>
                <Modal.Content scrolling className="no-padding">
                    <Segment.Group>
                        {/*<Segment
                        className="header"
                        content="Pick an option"
                        size="large"
                    />*/}
                        {options?.map((opt) => (
                            <Segment
                                content={opt.text}
                                onClick={() => {
                                    setValue(opt.value);
                                    toggleMenuOpen();
                                }}
                            />
                        ))}
                    </Segment.Group>
                </Modal.Content>
            </Modal>
        </>
    );
};
