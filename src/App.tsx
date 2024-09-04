import './App.css'
import Home from "./routes/home/home.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthProvider, {AuthIsNotSignedIn, AuthIsSignedIn} from "./contexts/authContext.tsx";
import SignIn from "./routes/auth/signIn.tsx";
import SignUp from "./routes/auth/signUp.tsx";
import VerifyCode from "./routes/auth/verifyCode.tsx";
import Landing from "./routes/landing/landing.tsx";
import {Toaster} from "react-hot-toast";
// import GlobalProvider from "./contexts/globalProvider.tsx";

const lightTheme = createTheme({
    colorSchemes: {
        light: true
    },
});


const SignInRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/verify" element={<VerifyCode/>}/>
            <Route path="/" element={<Landing/>}/>
        </Routes>
    </BrowserRouter>
)

const MainRoute = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
)


function App() {
    return <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
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
    </ThemeProvider>
}

export default App
