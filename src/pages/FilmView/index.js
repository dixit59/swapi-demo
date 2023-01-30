import * as React from 'react';
import { styled } from '@mui/material/styles';
import { CssBaseline, Drawer as MuiDrawer, Box, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, Container, Button, Card, ListItem, ListItemText } from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItem as ListItems}  from '../../components';
import logoImg from '../../images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/Auth';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

export default function FilmView() {
    const userData = useSelector((state) => state.auth.loadUser);
    const { state } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [filmData, setFilmData] = React.useState();

    React.useEffect(() => {
        setFilmData(state.FilmData);
    }, [state]);


    const toggleDrawer = () => {
        setOpen(!open);
    };
    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate('/signIn');
                dispatch(logoutUser());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
              Film
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 0.1 }}
                    >
                        {userData?.displayName}
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={logout}>
              Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <img src={logoImg} />
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav"><ListItems/></List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <h4 className="app_text_16_semibold ps-3 mt-4">Film Details</h4>
                    <Card className='shadow border border-1'>
                        <List>
                            <ListItem>
                                <ListItemText sx={{ flex: '0 0 120px' }}>Title</ListItemText>
                                <ListItemText sx={{ flex: '1 0 auto' }}>{filmData?.title}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText sx={{ flex: '0 0 120px' }}>Director</ListItemText>
                                <ListItemText sx={{ flex: '1 0 auto' }}>{filmData?.director}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText sx={{ flex: '0 0 120px' }}>Producer </ListItemText>
                                <ListItemText sx={{ flex: '1 0 auto' }}>{filmData?.producer}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText sx={{ flex: '0 0 120px' }}>Release Date </ListItemText>
                                <ListItemText sx={{ flex: '1 0 auto' }}>{moment(filmData?.release_date).format('MMM DD YYYY h:mm A')}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText sx={{ flex: '0 0 120px' }}>Episode Id </ListItemText>
                                <ListItemText sx={{ flex: '1 0 auto' }}>{filmData?.episode_id}</ListItemText>
                            </ListItem>
                        </List>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}
