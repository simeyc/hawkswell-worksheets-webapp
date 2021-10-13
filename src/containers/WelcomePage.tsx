import { FC } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavContext } from 'App';
import { NewWorksheetPage } from 'containers/NewWorksheetPage';

export const WelcomePage: FC = () => {
    const setPage = useNavContext();
    let username = localStorage.getItem('username');
    username = username ? ' ' + username : '';
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
                <Text>{`Hi${username}, welcome to the Worksheets Webapp!`}</Text>
            </View>
            <View>
                <Text>
                    <Button
                        title="Let's get started!"
                        onPress={() => {
                            // TODO: use react-router for back/forward support
                            setPage(<NewWorksheetPage />);
                        }}
                    />
                </Text>
            </View>
        </>
    );
};
