import { FC } from 'react';
import { Dropdown, DropdownProps, Modal, Segment } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { WorksheetValue } from 'types';
import qs from 'querystring';
import 'styles/styles.scss';

interface ModalDropdownProps extends DropdownProps {
    value?: WorksheetValue;
    name: string;
    setValue: (value: WorksheetValue) => void;
    menuOpen: boolean;
}

/* TODO: idea for using browser "back" to close menu:
 * pass menuOpen as prop, true when url query has "select=<setting_name>"
 * onOpen={() => history.push(current_url + '&select=<setting_name>')
 * onClose={() => history.goBack()}
 */
export const ModalDropdown: FC<ModalDropdownProps> = ({
    name,
    setValue,
    ...props
}) => {
    const location = useLocation();
    const history = useHistory();
    const queryOpts = qs.parse(location.search.slice(1));
    const menuOpen = queryOpts.select === name;
    const openMenu = () => {
        history.block(false);
        const queryString = qs.encode({ ...queryOpts, select: name });
        history.push(location.pathname + '?' + queryString);
    };
    const closeMenu = () => {
        history.block(false);
        history.goBack();
    };
    const { options } = props;
    return (
        <>
            <Dropdown {...props} onOpen={openMenu} open={false} />
            <Modal open={menuOpen} onClose={closeMenu}>
                <Modal.Content scrolling className="no-padding">
                    <Segment.Group>
                        <Segment
                            className="header"
                            content={name + ':'}
                            size="large"
                        />
                        {options?.map((opt) => (
                            <Segment
                                content={opt.text}
                                onClick={() => {
                                    setValue(opt.value as WorksheetValue);
                                    closeMenu();
                                }}
                            />
                        ))}
                    </Segment.Group>
                </Modal.Content>
            </Modal>
        </>
    );
};
