import { FC } from 'react';
import { Button } from 'semantic-ui-react';
import { WorksheetData } from 'types';
import { convertToCsv } from 'utils/worksheets';
import 'styles/worksheet.css';

interface ShareButtonProps {
    data: WorksheetData;
    valid: boolean;
    onShared: () => void;
}

let canShare = false;
try {
    // Navigator type is incomplete, cast to any
    canShare = (navigator as any).canShare();
} catch {}

export const ShareButton: FC<ShareButtonProps> = ({
    data,
    valid,
    onShared,
}) => {
    const downloadPrompt = () => {
        // TODO: prompt "sharing is unavailable, download worksheet instead?"
    };
    const onClick = async () => {
        const username = data['Driver'] as string;
        localStorage.setItem('username', username);
        data['Timestamp'] = Date.now(); // update Timestamp
        const csvFile = new File(
            [convertToCsv(data)],
            'my-worksheet.csv', // TODO: worksheet filename
            { type: 'text/plain' }
        );
        if (canShare) {
            await navigator
                .share({
                    files: [csvFile],
                    title: 'TODO: worksheet title',
                })
                .then(() => {
                    console.log('SHARED SUCCESSFULLY!');
                    onShared();
                })
                .catch((err) => {
                    console.warn('FAILED TO SHARE:', err);
                    downloadPrompt();
                });
        } else {
            downloadPrompt();
        }
    };
    return (
        <Button
            className="share-button"
            content={valid ? 'Share' : 'Worksheet incomplete'}
            color={valid ? 'green' : undefined}
            onClick={onClick}
            disabled={!valid}
        />
    );
};
