import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {AppProvider, Session} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import type {Navigation, Router} from '@toolpad/core';
import {useContext} from "react";
import {AuthContext} from "../../contexts/authContext.tsx";
import {useNavigate} from "react-router-dom";
import {Pathname} from "../constants.ts";
import StudentsSection from "../../components/TasksSection/StudentsSection.tsx";

const NAVIGATION: Navigation = [
    {
        segment: '',
        title: 'Dashboard',
        icon: <DashboardIcon/>,
    }
];

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {light: true, dark: true},
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function PageContent() {
    return (
        <StudentsSection/>
    );
}


export default function Home() {
    const [pathname, setPathname] = React.useState('/');

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);


    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSignOut = async () => {
        await authContext.signOut()
        navigate(Pathname.DEFAULT)
    };


    const currentUser = authContext.currentUser

    const [session, setSession] = React.useState<Session | null>({
        user: {
            name: currentUser?.username,
            email: currentUser?.email,
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: currentUser?.username,
                        email: currentUser?.email,
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: async () => {
                setSession(null);
                await handleSignOut()
            },
        };
    }, []);

    // TODO update LOGO
    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo"/>,
                title: 'MUI',
            }}
            session={session}
            authentication={authentication}
            router={router}
            theme={theme}
        >
            <DashboardLayout>
                <PageContent/>
            </DashboardLayout>
        </AppProvider>

    );
}