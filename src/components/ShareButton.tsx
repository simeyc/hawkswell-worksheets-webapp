import { FC, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { WorksheetData } from 'types';
import { convertToCsv } from 'utils/worksheets';
import { DownloadModal } from 'components/DownloadModal';
import 'styles/styles.scss';

interface ShareButtonProps {
    data: WorksheetData;
    valid: boolean;
    onShared: () => void;
}

export const ShareButton: FC<ShareButtonProps> = ({
    data,
    valid,
    onShared,
}) => {
    const [downloadData, setDownloadData] = useState('');
    const onClick = async () => {
        const username = data['Driver'] as string;
        localStorage.setItem('username', username);
        data['Timestamp'] = Date.now(); // update Timestamp
        console.log({ data, keys: Object.keys(data) });
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
        <>
            <Button
                className="share-button"
                content={valid ? 'Share' : 'Worksheet incomplete'}
                color={valid ? 'green' : undefined}
                onClick={onClick}
                disabled={!valid}
            />
            <DownloadModal
                data={downloadData}
                onClose={() => setDownloadData('')}
                // TODO: call onShared on download (disables nav prompt)
            />
        </>
    );
};
