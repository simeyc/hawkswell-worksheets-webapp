import React, { FC, useState } from 'react';
import { WelcomePage } from 'containers/WelcomePage';
import 'styles/App.css';

const NavContext = React.createContext((page: React.ReactNode) => {});
export const useNavContext = () => React.useContext(NavContext);

const App: FC = () => {
    const [page, setPage] = useState<React.ReactNode>(<WelcomePage />);
    console.log('render app page:', page);
    return (
        <NavContext.Provider value={setPage}>
            <div style={{ background: '#e9ffdb' }}>
                <div style={{ maxWidth: '500px', margin: 'auto' }}>{page}</div>
            </div>
        </NavContext.Provider>
    );
};

export default App;
