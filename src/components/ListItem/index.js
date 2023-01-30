import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { NavLink } from 'react-router-dom';

export default function ListItem() {
    return (
        <>
            <NavLink to="/dashboard">
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Dashboard"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            textDecoration: 'underline',
                            textDecorationColor: 'white',
                        }}
                    />
                </ListItemButton>
            </NavLink>
            <NavLink to="/people">
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Peoples"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            textDecoration: 'underline',
                            textDecorationColor: 'white',
                        }}
                    />
                </ListItemButton>
            </NavLink>
            <NavLink to="/film">
                <ListItemButton>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Films"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            textDecoration: 'underline',
                            textDecorationColor: 'white',
                        }}
                    />
                </ListItemButton>
            </NavLink>
        </>
    );
}
