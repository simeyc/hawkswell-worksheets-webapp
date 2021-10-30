import { FC } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { useNavContext } from 'App';
import { NewWorksheetPage } from 'containers/NewWorksheetPage';

export const WelcomePage: FC = () => {
    const setPage = useNavContext();
    let username = localStorage.getItem('username');
    username = username ? ' ' + username : '';
    return (
        <>
            <Header>M Hawkswell Contracting Ltd</Header>
            <div>{`Hi${username}, welcome to the Worksheets Webapp!`}</div>
            <Button
                content="Let's get started!"
                onClick={() => {
                    // TODO: use react-router for back/forward support
                    setPage(<NewWorksheetPage />);
                }}
            />
        </>
    );
};
