import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SignIn } from '../../pages';

function PrivateRoute({ children }) {
    const result = useSelector((state) => state.auth.loadUser);

    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (result === false) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <SignIn/>;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
