import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { auth } from './firebase';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log(user);
        });
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </div>
    );
}

export default App;
