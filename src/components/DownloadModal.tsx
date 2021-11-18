import { FC } from 'react';
import { Modal, Button, ModalProps, Header } from 'semantic-ui-react';

interface DownloadModalProps extends ModalProps {
    data: string;
    onClose: () => void;
}

export const DownloadModal: FC<DownloadModalProps> = ({
    data,
    onClose,
    ...modalProps
}) => {
    return (
        <Modal {...modalProps} onClose={onClose} open={!!data}>
            <Header icon="frown outline" content="Sharing is unavailable" />
            <Modal.Content content="Would you like to download the worksheet instead?" />
            <Modal.Actions>
                <Button
                    color="blue"
                    content="Download"
                    icon="download"
                    onClick={() => {
                        const file = new Blob([data], {
                            type: 'text/plain',
                        });
                        let link = document.createElement('a');
                        link.download = 'my-worksheet-filename.csv'; // TODO
                        link.href = URL.createObjectURL(file);
                        link.click();
                    }}
                />
                <Button content="Cancel" onClick={onClose} />
            </Modal.Actions>
        </Modal>
    );
};
