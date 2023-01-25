import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
    });
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!value.fName || !value.lName || !value.email || !value.password) {
            setErrorMsg('Fill all fields.');
            return;
        }
        setErrorMsg('');

        createUserWithEmailAndPassword(auth, value.email, value.password)
            .then(async(res) => {
                await updateProfile(res.user,{
                    displayName:`${value.fName} ${value.lName}`
                });
                navigate('/');
            })
            .catch((err) => {
                console.log('err', err);
                setErrorMsg(err.code);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
            Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(e) => {
                                        setValue((prev) => ({
                                            ...prev,
                                            fName: e.target.value.trim(),
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => {
                                        setValue((prev) => ({
                                            ...prev,
                                            lName: e.target.value.trim(),
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setValue((prev) => ({
                                            ...prev,
                                            email: e.target.value.trim(),
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setValue((prev) => ({
                                            ...prev,
                                            password: e.target.value.trim(),
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{ color: 'red' }}>{errorMsg}</span>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
              Sign Up
                        </Button>
                        <br />
                        <br />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/signIn">
                                    {' '}
                  Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
