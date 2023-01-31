import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Dashboard, Film, FilmView, PageNotFound, People, PeopleView, SignIn, SignUp } from '../pages';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const RouteList = () => {
    const result = useSelector((state) => state.auth.loadUser);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (result && location.pathname === '/signIn') {
            return navigate('/dashboard');
        } else if (location.pathname === '' || location.pathname === '/') {
            if (result) {
                return navigate('/dashboard');
            } else {
                return navigate('/signIn');
            }
        }
    }, [location,result]);

    return (
        <Routes>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/people" element={<PrivateRoute><People /></PrivateRoute>} />
            <Route path="/film" element={<PrivateRoute><Film /></PrivateRoute>} />
            <Route path="/people-view" element={<PrivateRoute><PeopleView /></PrivateRoute>} />
            <Route path="/film-view" element={<PrivateRoute><FilmView /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><PageNotFound /></PrivateRoute>} />
        </Routes>
    );
};

export default RouteList;
