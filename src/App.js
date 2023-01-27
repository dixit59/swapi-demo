import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './redux/actions/Auth';
import RouteList from './routes';

function App() {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.auth.loadUser);
    console.log('result', result);

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
