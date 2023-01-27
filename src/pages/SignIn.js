import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/actions/Auth';

const theme = createTheme();

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = React.useState({
        email: '',
        password: '',
    });
    const [errorMsg, setErrorMsg] = React.useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!value.email || !value.password) {
            setErrorMsg('Fill all fields.');
            return;
        }
        setErrorMsg('');

        signInWithEmailAndPassword(auth, value.email, value.password)
            .then((res) => {
                navigate('/dashboard');
                dispatch(setAuthUser(res.user.providerData?.[0]));
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
            Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => {
                                setValue((prev) => ({
                                    ...prev,
                                    email: e.target.value.trim(),
                                }));
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setValue((prev) => ({
                                    ...prev,
                                    password: e.target.value.trim(),
                                }));
                            }}
                        />
                        <span style={{ color: 'red' }}>{errorMsg}</span>
                        <br/>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
              Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item>
                                <NavLink to="/signUp">
                                    {' '}
                                    {'Don\'t have an account? Sign Up'}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
