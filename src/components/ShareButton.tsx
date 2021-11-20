import { FC, useState } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { WorksheetData } from 'types';
import { convertToCsv } from 'utils/worksheets';
import { DownloadModal } from 'components/DownloadModal';
import 'styles/styles.scss';

interface ShareButtonProps {
    data: WorksheetData;
    valid: boolean;
    onShared: () => void;
    onClickInvalid: () => void;
}

export const ShareButton: FC<ShareButtonProps> = ({
    data,
    valid,
    onShared,
    onClickInvalid,
}) => {
    const [downloadData, setDownloadData] = useState('');
    const [showInvalidModal, setShowInvalidModal] = useState(false);
    const toggleInvalidModal = () => setShowInvalidModal(!showInvalidModal);
    const onClickValid = async () => {
        const username = data['Driver'] as string;
        localStorage.setItem('username', username);
        data['Timestamp'] = Date.now(); // update Timestamp
        const csvData = convertToCsv(data);
        const csvFile = new File(
            [csvData],
            'my-worksheet.csv', // TODO: worksheet filename
            { type: 'text/plain' }
        );
        try {
            await navigator
                .share({
                    files: [csvFile],
                    title: 'TODO: worksheet title',
                })
                .then(() => {
                    console.log('SHARED SUCCESSFULLY!');
                    onShared();
                });
        } catch {
            setDownloadData(csvData);
        }
    };
    return (
        <div
            className="share-button"
            onClick={valid ? undefined : toggleInvalidModal}
        >
            <Button
                content="Share"
                color="green"
                onClick={onClickValid}
                disabled={!valid}
                icon={valid ? 'share' : 'ban'}
            />
            <DownloadModal
                data={downloadData}
                onClose={() => setDownloadData('')}
                // TODO: call onShared on download (disables nav prompt)
            />
            <Modal open={showInvalidModal} closeOnDimmerClick={false}>
                <Header icon="ban" content="Worksheet invalid" />
                <Modal.Content content="Worksheet is invalid or incomplete. Please fix the errors marked in red." />
                <Modal.Actions>
                    <Button
                        content="Ok"
                        onClick={() => {
                            onClickInvalid();
                            toggleInvalidModal();
                        }}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};
