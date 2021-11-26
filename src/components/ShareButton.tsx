import { FC, useState } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { WorksheetData } from 'types';
import { convertToCsv, constructFilename } from 'utils';
import { ResponsiveMedia } from 'components/ResponsiveMedia';
import { isSafari } from 'react-device-detect';
import 'styles/styles.scss';

interface ShareButtonProps {
    data: WorksheetData;
    valid: boolean;
    onShared: () => void;
    onClickInvalid: () => void;
}

const getFileContent = (data: WorksheetData) => {
    const username = data['Driver'] as string;
    localStorage.setItem('username', username);
    data['Timestamp'] = Date.now(); // update Timestamp
    const fileData = convertToCsv(data);
    const fileName = constructFilename(
        [data['Job Type'] as string, username, data['Timestamp'].toString()],
        '.csv'
    );
    return { fileData, fileName, fileOpts: { type: 'text/csv' } };
};

export const ShareButton: FC<ShareButtonProps> = ({
    data,
    valid,
    onShared,
    onClickInvalid,
}) => {
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const toggleDownloadModal = () => setShowDownloadModal(!showDownloadModal);
    const [showInvalidModal, setShowInvalidModal] = useState(false);
    const toggleInvalidModal = () => setShowInvalidModal(!showInvalidModal);
    const onClickShare = async () => {
        const { fileData, fileName, fileOpts } = getFileContent(data);
        const file = new File([fileData], fileName, fileOpts);
        const shareData: ShareData = { files: [file] };
        if (!isSafari) {
            shareData.title = data['Job Type'] + ' Worksheet';
        }
        try {
            await navigator.share(shareData).then(onShared);
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                toggleDownloadModal();
            }
        }
    };
    const onClickDownload = () => {
        const { fileData, fileName, fileOpts } = getFileContent(data);
        const blob = new Blob([fileData], fileOpts);
        let link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
        onShared();
    };
    return (
        <div
            className="share-button"
            onClick={valid ? undefined : toggleInvalidModal}
        >
            <Button
                type="button" // prevent click on form submit
                content="Share"
                color="green"
                onClick={onClickShare}
                disabled={!valid}
                icon="share"
            />
            <ResponsiveMedia greaterThanOrEqual="DESKTOP">
                <Button
                    type="button" // prevent click on form submit
                    content="Download"
                    color="yellow"
                    onClick={onClickDownload}
                    disabled={!valid}
                    icon="download"
                />
            </ResponsiveMedia>
            <Modal open={showDownloadModal} onClose={toggleDownloadModal}>
                <Header icon="frown outline" content="Sharing is unavailable" />
                <Modal.Content content="Would you like to download the worksheet instead?" />
                <Modal.Actions>
                    <Button
                        color="blue"
                        content="Download"
                        icon="download"
                        onClick={onClickDownload}
                    />
                    <Button content="Cancel" onClick={toggleDownloadModal} />
                </Modal.Actions>
            </Modal>
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
