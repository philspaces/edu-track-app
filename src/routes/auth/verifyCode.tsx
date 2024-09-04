import {SyntheticEvent, useContext, useState} from 'react';
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    CssBaseline,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useValidCode, useValidUsername} from "../../hooks/useAuthHooks.tsx";
import {Pathname} from "../constants.ts";
import {AuthContext} from "../../contexts/authContext.tsx";
import {Code, Username} from "../../components/authComponents.tsx";

function VerifyUsername() {
    const navigate = useNavigate()

    const authContext = useContext(AuthContext)
    const [searchParams] = useSearchParams();
    const prefillUsername = searchParams.get('username');
    const {username, setUsername, usernameIsValid} = useValidUsername(prefillUsername || '')
    const {code, setCode, codeIsValid} = useValidCode('')
    const [error, setError] = useState('')

    const isValid = !usernameIsValid || username.length === 0 || !codeIsValid || code.length === 0

    const handleVerification = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await authContext.verifyAccount(username, code)
            navigate(Pathname.SIGN_IN)
        } catch (err) {
            setError('Invalid Code')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verify Username
                </Typography>
                <Box component="form" onSubmit={handleVerification} noValidate sx={{mt: 1}}>
                    <Username username={username} setUsername={setUsername} usernameIsValid={usernameIsValid}/>
                    <Code code={code} codeIsValid={codeIsValid} setCode={setCode}/>
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                    <Button
                        disabled={isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Verify
                    </Button>
                    <Grid>
                        <Grid item>
                            <Link onClick={() => navigate(Pathname.SIGN_IN)} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default VerifyUsername;
