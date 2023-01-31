import React, { useState, useEffect } from 'react';
import { List, Card, ListItem, ListItemText } from '@mui/material';
import { MainLayout } from '../../components';
import { useLocation } from 'react-router-dom';

export default function PeopleView() {
    const { state } = useLocation();
    const [peopleData, setPeopleData] = useState();

    useEffect(() => {
        setPeopleData(state.PeopleData);
    }, [state]);

    return (
        <MainLayout title="People">
            <h4 className="app_text_16_semibold ps-3 mt-4">People Details</h4>
            <Card className="shadow border border-1">
                <List>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Name</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.name}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Eye Color</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.eye_color}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Gender</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.gender}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Skin Color </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.skin_color}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Height </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.height}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Mass </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.mass}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Hair Color </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {peopleData?.hair_color}
                        </ListItemText>
                    </ListItem>
                </List>
            </Card>
        </MainLayout>
    );
}
