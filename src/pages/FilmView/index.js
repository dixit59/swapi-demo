import React, { useState, useEffect } from 'react';
import { List, Card, ListItem, ListItemText } from '@mui/material';
import { MainLayout } from '../../components';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

export default function FilmView() {
    const { state } = useLocation();
    const [filmData, setFilmData] = useState();

    useEffect(() => {
        setFilmData(state.FilmData);
    }, [state]);

    return (
        <MainLayout title="Film">
            <h4 className="app_text_16_semibold ps-3 mt-4">Film Details</h4>
            <Card className="shadow border border-1">
                <List>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Title</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {filmData?.title}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Director</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {filmData?.director}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Producer </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {filmData?.producer}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Release Date</ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {moment(filmData?.release_date).format('MMM DD YYYY h:mm A')}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ flex: '0 0 120px' }}>Episode Id </ListItemText>
                        <ListItemText sx={{ flex: '1 0 auto' }}>
                            {filmData?.episode_id}
                        </ListItemText>
                    </ListItem>
                </List>
            </Card>
        </MainLayout>
    );
}
