import { FC, useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';

export const WelcomePage: FC = () => {
    const [name, setName] = useState('');
    useEffect(() => {
        // TODO: load name from local storage (spinner while loading)
    }, []);
    return (
        <>
            <div style={{ fontWeight: 'bold' }}>
                M Hawkswell Contracting Ltd
            </div>
            <div style={{ fontStyle: 'italic' }}>Worksheets App</div>
            <div>Please enter your name:</div>
            <div>
                <TextInput value={name} onChangeText={setName} />
            </div>
            <div>
                <Button
                    title="Let's get started!"
                    onPress={() => {
                        // TODO: save name in local storage
                        // TODO: progress to HomePage
                    }}
                    disabled={!name}
                />
            </div>
        </>
    );
};
