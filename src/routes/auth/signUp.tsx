import {FormEvent, useContext, useState} from 'react';
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
import {useValidEmail, useValidPassword, useValidUsername} from "../../hooks/useAuthHooks.tsx";
import {useNavigate} from "react-router-dom";
import {Email, Password, Username} from "../../components/authComponents.tsx";
import {AuthContext} from "../../contexts/authContext.tsx";

function SignUp() {
    const authContext = useContext(AuthContext)

    const { email, setEmail, emailIsValid } = useValidEmail('')
    const { password, setPassword, passwordIsValid } = useValidPassword('')
    const { username, setUsername, usernameIsValid } = useValidUsername('')
    const {
        password: passwordConfirm,
        setPassword: setPasswordConfirm,
        passwordIsValid: passwordConfirmIsValid,
    } = useValidPassword('')
    const [error, setError] = useState('')

    const isValid =
        !emailIsValid ||
        email.length === 0 ||
        !usernameIsValid ||
        username.length === 0 ||
        !passwordIsValid ||
        password.length === 0 ||
        !passwordConfirmIsValid ||
        passwordConfirm.length === 0

    const navigate = useNavigate()

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await authContext.signUp(username, email, password)
            navigate(Pathname.VERIFY + `?username=${username}`)
        } catch (err) {
            if (err instanceof Error) {
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
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
                    <Username username={username} setUsername={setUsername} usernameIsValid={usernameIsValid} />
                    <Email email={email} emailIsValid={emailIsValid} setEmail={setEmail} />
                    <Password password={password} label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
                    <Password password={passwordConfirm}  label="Confirm Password" passwordIsValid={passwordConfirmIsValid} setPassword={setPasswordConfirm} />
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                    <Button
                        disabled={isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => navigate(-1)} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
