import * as React from 'react';
import { styled } from '@mui/material/styles';
import { CssBaseline, Drawer as MuiDrawer, Box, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, Container, Paper, Button, ButtonGroup, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItem }  from '../../components';
import logoImg from '../../images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/Auth';
import axios from 'axios';

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

export default function People() {
    const userData = useSelector((state) => state.auth.loadUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tableData, setTableData] = React.useState([]);
    const [nextButtonDisable, setNextButtonDisable] = React.useState(false);
    const [previousButtonDisable, setPreviousButtonDisable] = React.useState(true);

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
    const fetchData = async (pageVal) => {
        const response = await axios.get(
            `https://swapi.dev/api/people/?page=${pageVal}`
        );
        setTableData(response.data.results);
        setCount(response.data.count);
    };
    React.useEffect(() => {
        fetchData(1);
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const paginateHandler = (val) => {
        if(val == 'next'){
            setPage(page+1);
        }else{
            setPage(page-1);
        }
        if(page == 1){
            setPreviousButtonDisable(true);
            setNextButtonDisable(false);
        }else{
            setPreviousButtonDisable(false);
        }

        fetchData(page);
        if(page*10 > count ){
            setNextButtonDisable(true);
        }
    };

    const handleRequestView = (data) => {
        navigate('/people-view', { state: { PeopleData: data } });
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
              Peoples
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
                <List component="nav">
                    <ListItem/>
                </List>
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Gender</StyledTableCell>
                                    <StyledTableCell align="right">Height</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row,i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.gender}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.height}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleRequestView(row)}
                                            > View Details </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button disabled={previousButtonDisable} onClick={()=>paginateHandler('previous')}>previous</Button>
                        <Button disabled={nextButtonDisable} onClick={()=>paginateHandler('next')}>next</Button>
                    </ButtonGroup>
                </Container>
            </Box>
        </Box>
    );
}
