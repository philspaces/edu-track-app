import {useContext, useState} from 'react';
import {
    Container,
    Box,
    Avatar,
    Typography,
    Button,
    Grid,
    Link,
    CssBaseline,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Pathname} from "../constants.ts";
import {useValidPassword, useValidUsername} from "../../hooks/useAuthHooks.tsx";
import {AuthContext} from "../../contexts/authContext.tsx";
import {useNavigate} from "react-router-dom";
import {Password, Username} from "../../components/authComponents.tsx";

function SignIn() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()


    const { username, setUsername, usernameIsValid } = useValidUsername('')
    const { password, setPassword, passwordIsValid } = useValidPassword('')
    const [error, setError] = useState('')

    const isValid = !usernameIsValid || username.length === 0 || !passwordIsValid || password.length === 0


    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await authContext.signIn(username, password)
            navigate(Pathname.DEFAULT)
        } catch (err: any) {
            if (err.code === 'UserNotConfirmedException') {
                navigate(Pathname.VERIFY)
            } else {
                setError(err.message)
            }
        }
    };

    return (
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
                <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
                    <Username username={username} setUsername={setUsername} usernameIsValid={usernameIsValid} />
                    <Password password={password} label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />

                    {/* Error */}
                    <Box mt={2}>
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    </Box>

                    <Button
                        disabled={isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent={'end'}>
                        <Grid item >
                            <Link href={Pathname.SIGN_UP} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;
