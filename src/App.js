import './App.css';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './redux/actions/Auth';
import RouteList from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme();

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) dispatch(setAuthUser(user.providerData?.[0]));
        });
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <RouteList />
        </ThemeProvider>
    );
}

export default App;
