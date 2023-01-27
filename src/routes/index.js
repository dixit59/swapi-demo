import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import { useSelector } from 'react-redux';
import People from '../pages/People';
import Film from '../pages/Film';
import PeopleView from '../pages/PeopleView';
import FilmView from '../pages/FilmView';
import PageNotFound from '../pages/PageNotFound';

const RouteList = () => {
    const result = useSelector((state) => state.auth.loadUser);
    const location = useLocation();
    const navigate = useNavigate();

    if (result === false && (location.pathname === '/dashboard' || location.pathname === '/people' || location.pathname === '/film')) {
        return <SignIn/>;
    } else if (result && location.pathname === '/signIn') {
        return navigate('/dashboard');
    } else if (location.pathname === '' || location.pathname === '/') {
        if(result){
            return navigate('/dashboard');
        }else{
            return navigate('/signIn');
        }
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/people" element={<People />} />
            <Route path="/film" element={<Film />} />
            <Route path="/people-view" element={<PeopleView />} />
            <Route path="/film-view" element={<FilmView />} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
};

export default RouteList;
