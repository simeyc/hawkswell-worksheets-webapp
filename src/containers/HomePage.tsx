import { FC } from 'react';
import { Button } from 'react-native';

export const WelcomePage: FC<{ name: string }> = ({ name }) => {
    return (
        <>
            <div>{`Hi ${name}!`}</div>
            <div>
                <Button
                    title="New Worksheet"
                    onPress={() => {
                        console.log('Pressed New Worksheet');
                        // TODO: navigate to NewWorksheetPage
                    }}
                />
            </div>
            <div>
                <Button
                    title="Edit Name"
                    onPress={() => {
                        console.log('Pressed Edit Name');
                        // TODO: navigate to welcome screen
                    }}
                />
            </div>
        </>
    );
};
