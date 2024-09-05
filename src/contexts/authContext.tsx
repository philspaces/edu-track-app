import {createContext, ReactNode, useContext, useEffect, useState} from 'react'

import * as authService from '../libs/authService.ts'
import {refreshToken} from "../libs/authService.ts";
import {useAmplifyClient} from "./amplifyClientContext.tsx";

import {listTeachers} from "../graphql/queries.js";
import {createTeacher} from "../graphql/mutations.js";

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

interface IUser {
    "username"?: string,
    "email"?: string,
}

export interface IAuth {
    sessionInfo?: ISession
    attrInfo?: any
    currentUser?: IUser | null
    authStatus?: AuthStatus
    signIn: (username: string, password: string) => Promise<any>
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

interface ISession {
    accessToken?: string
    refreshToken?: string
}

const defaultState: IAuth = {
    sessionInfo: {},
    authStatus: AuthStatus.Loading,
    signIn: async (username, password) => {
    }
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
    const [sessionInfo, setSessionInfo] = useState<ISession>({})
    const [attrInfo, setAttrInfo] = useState([])
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

    const amplifyClient = useAmplifyClient();

    async function getSessionInfo() {
        try {
            const savedAccessToken = window.localStorage.getItem('accessToken')
            const savedRefreshToken = window.localStorage.getItem('refreshToken')
            const savedUsername = window.localStorage.getItem('username')
            window.localStorage.setItem('accessToken', `${sessionInfo?.accessToken || savedAccessToken}`)
            window.localStorage.setItem('refreshToken', `${sessionInfo?.refreshToken || savedRefreshToken}`)
            window.localStorage.setItem('username', `${currentUser?.username || savedUsername}`)

            if (!sessionInfo.accessToken && !savedAccessToken) {
                throw new Error('user are signed out')
            }

            const userAttributes = await getCurrentUser()
            let tempUserAttributes: IUser = currentUser || {username: savedUsername || '', email: ''}
            for (const {Name, Value} of userAttributes) {
                tempUserAttributes = {...tempUserAttributes, [Name]: Value}
            }

            const userQuery: any = await amplifyClient.graphql({
                query: listTeachers,
                variables: {
                    filter: {
                        username: {eq: tempUserAttributes.username}
                    }
                }
            });

            const userID = userQuery.data?.listTeachers?.items?.[0]?.id
            setCurrentUser(prev => prev ? ({...prev, ...tempUserAttributes, userID}) : ({
                ...tempUserAttributes,
                userID
            }))
            setAuthStatus(AuthStatus.SignedIn)
        } catch (err) {
            console.error(err)
            setAuthStatus(AuthStatus.SignedOut)
        }
    }

    useEffect(() => {
        getSessionInfo()
    }, [setAuthStatus, authStatus])

    if (authStatus === AuthStatus.Loading) {
        return null
    }

    async function signIn(username: string, password: string) {
        try {
            const {message, ...loginRes} = await authService.login(username, password)
            window.localStorage.setItem('username', `${username}`)

            setCurrentUser(prev => prev ? ({...(prev), username}) : ({username}))
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
            window.localStorage.setItem('username', `${username}`)

            const userMutation: any = await amplifyClient.graphql({
                query: createTeacher,
                variables: {
                    input: {
                        username, email
                    }
                }
            });
            const userID = userMutation?.data?.createTeacher?.id
            setCurrentUser(prev => prev ? ({...prev, userID, username, email}) : ({userID, username, email}))
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
