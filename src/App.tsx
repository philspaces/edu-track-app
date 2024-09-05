import CssBaseline from "@mui/material/CssBaseline"; // must be first thing to import

import './App.css'
import Home from "./routes/home/home.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthProvider, {AuthIsNotSignedIn, AuthIsSignedIn} from "./contexts/authContext.tsx";
import SignIn from "./routes/auth/signIn.tsx";
import SignUp from "./routes/auth/signUp.tsx";
import VerifyCode from "./routes/auth/verifyCode.tsx";
import Landing from "./routes/landing/landing.tsx";
import {Toaster} from "react-hot-toast";
import {Pathname} from "./routes/constants.ts";
import {AmplifyClientProvider} from "./contexts/amplifyClientContext.tsx";
import {StyledEngineProvider} from '@mui/material/styles';

// import GlobalProvider from "./contexts/globalProvider.tsx";

const lightTheme = createTheme({
    colorSchemes: {
        light: true
    },
});


const SignInRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path={Pathname.SIGN_IN} element={<SignIn/>}/>
            <Route path={Pathname.SIGN_UP} element={<SignUp/>}/>
            <Route path={Pathname.VERIFY} element={<VerifyCode/>}/>
            <Route path={Pathname.DEFAULT} element={<Landing/>}/>
        </Routes>
    </BrowserRouter>
)

const MainRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path={Pathname.DEFAULT} element={<Home/>}/>
            <Route path={Pathname.HOME} element={<Home/>}/>
        </Routes>
    </BrowserRouter>
)


function App() {
    return <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
        <AmplifyClientProvider>
            <StyledEngineProvider>
                <AuthProvider>
                    <AuthIsSignedIn>
                        {/*<GlobalProvider>*/}
                        <Toaster/>
                        <MainRoute/>
                        {/*</GlobalProvider>*/}
                    </AuthIsSignedIn>
                    <AuthIsNotSignedIn>
                        <SignInRoute/>
                    </AuthIsNotSignedIn>
                </AuthProvider>
            </StyledEngineProvider>
        </AmplifyClientProvider>
    </ThemeProvider>
}

export default App
