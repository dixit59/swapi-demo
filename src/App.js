import './App.css';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './redux/actions/Auth';
import RouteList from './routes';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) dispatch(setAuthUser(user.providerData?.[0]));
        });
    }, []);

    return (
        <div>
            <RouteList />
        </div>
    );
}

export default App;
