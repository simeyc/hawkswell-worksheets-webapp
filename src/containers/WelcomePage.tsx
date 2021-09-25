import { FC, useState, useEffect } from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { useNavContext } from 'App';
import { NewWorksheetPage } from 'containers/NewWorksheetPage';

export const WelcomePage: FC = () => {
    const [name, setName] = useState('');
    const setPage = useNavContext();
    useEffect(() => {
        // TODO: load name from local storage (spinner while loading)
    }, []);
    console.log('render WelcomePage');
    return (
        <>
            <View>
                <Text style={{ fontWeight: 'bold' }}>
                    M Hawkswell Contracting Ltd
                </Text>
            </View>
            <View>
                <Text style={{ fontStyle: 'italic' }}>Worksheets App</Text>
            </View>
            <View>
                <Text>Please enter your name:</Text>
            </View>
            <View>
                <Text>
                    <TextInput value={name} onChangeText={setName} />
                </Text>
            </View>
            <View>
                <Text>
                    <Button
                        title="Let's get started!"
                        onPress={() => {
                            // TODO: save name in local storage
                            // TODO: progress to HomePage
                            setPage(<NewWorksheetPage />);
                        }}
                        disabled={!name}
                    />
                </Text>
            </View>
        </>
    );
};
