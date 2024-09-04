import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

import * as authService from '../libs/authService.ts'
import {refreshToken} from "../libs/authService.ts";

// import {useAmplifyClient} from "./amplifyClientContext.tsx";
// import {listUsers} from "../graphql/queries.js";

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

interface IUser {
    given_name: string
    sub: string
    email?: string
    email_verified?: boolean
    family_name?: string
    birthdate?: string
}

export interface IAuth {
    sessionInfo?: { accessToken?: string; refreshToken?: string }
    attrInfo?: any
    currentUser?: IUser | null
    authStatus?: AuthStatus
    signIn?: any
    signUp?: any
    signOut?: any
    verifyAccount?: any
    refreshToken?: any
    sendCode?: any
    forgotPassword?: any
    changePassword?: any
    getAttributes?: any
    setAttribute?: any
}

const defaultState: IAuth = {
    sessionInfo: {},
    authStatus: AuthStatus.Loading,
}

type Props = {
    children?: ReactNode
}

export const AuthContext = createContext(defaultState)

export const AuthIsSignedIn = ({children}: Props) => {
    const {authStatus}: IAuth = useContext(AuthContext)

    return <>{authStatus === AuthStatus.SignedIn ? children : null}</>
}

export const AuthIsNotSignedIn = ({children}: Props) => {
    const {authStatus}: IAuth = useContext(AuthContext)

    return <>{authStatus === AuthStatus.SignedOut ? children : null}</>
}



const AuthProvider = ({children}: Props) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading)
    const [sessionInfo, setSessionInfo] = useState({})
    const [attrInfo, setAttrInfo] = useState([])
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

    // TODO add auth client
    // const amplifyClient = useAmplifyClient();

    useEffect(() => {
        async function getSessionInfo() {
            try {
                window.localStorage.setItem('accessToken', `${sessionInfo?.accessToken}`)
                window.localStorage.setItem('refreshToken', `${sessionInfo?.refreshToken}`)
                const userAttributes = await getCurrentUser()
                for (const {Name, Value} of userAttributes) {
                    setCurrentUser(prev => ({...prev, [Name]: Value}))
                }

                // TODO query user data in DB
                // const userQuery = await amplifyClient.graphql({
                //     query: listUsers,
                //     variables: {
                //         filter: {
                //             username: {eq: user.username}
                //         }
                //     }
                // });
                // const userID = userQuery.data.listUsers.items[0].id
                const userID = 'mockUserID'
                setCurrentUser(prev => ({...prev, userID}))
                setAuthStatus(AuthStatus.SignedIn)
            } catch (err) {
                setAuthStatus(AuthStatus.SignedOut)
            }
        }

        getSessionInfo()
    }, [setAuthStatus, authStatus])

    if (authStatus === AuthStatus.Loading) {
        return null
    }

    async function signIn(username: string, password: string) {
        try {
            const {message, ...loginRes} = await authService.login(username, password)
            setSessionInfo(loginRes)

            setAuthStatus(AuthStatus.SignedIn)
        } catch (err) {
            setAuthStatus(AuthStatus.SignedOut)
            throw err
        }
    }

    async function signUp(username: string, email: string, password: string) {
        try {
            await authService.signUp(username, password, email)
        } catch (err) {
            throw err
        }
    }

    function signOut() {
        authService.logout()
        setAuthStatus(AuthStatus.SignedOut)
    }

    async function verifyAccount(username: string, code: string) {
        try {
            await authService.verifyAccount(username, code)
        } catch (err) {
            throw err
        }
    }

    async function refreshToken() {
        try {
            const session = await authService.refreshToken()
            return session
        } catch (err) {
            throw err
        }
    }

    async function getCurrentUser() {
        try {
            const {message, ...user} = await authService.getUser()
            return user?.userAttributes
        } catch (err) {
            throw err
        }
    }

    const state: IAuth = {
        authStatus,
        sessionInfo,
        attrInfo,
        currentUser,
        signUp,
        signIn,
        signOut,
        verifyAccount,
        refreshToken
    }

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
