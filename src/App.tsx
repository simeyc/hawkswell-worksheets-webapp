import React, { FC, useState } from 'react';
import { WelcomePage } from 'containers/WelcomePage';
import 'styles/App.css';

const NavContext = React.createContext((page: React.ReactNode) => {});
export const useNavContext = () => React.useContext(NavContext);

const App: FC = () => {
    const [page, setPage] = useState<React.ReactNode>(<WelcomePage />);
    console.log('render app page:', page);
    return <NavContext.Provider value={setPage}>{page}</NavContext.Provider>;
};

export default App;
