import {createContext, useContext, useEffect, useState} from "react";
import authContext from "./authContext.tsx";
import {useAmplifyClient} from "./amplifyClientContext.tsx";
import * as subscriptions from "../graphql/subscriptions.js";
import toast from "react-hot-toast";

export interface IGlobal {
    isLoading?: boolean,
    modal?: boolean,
    isStudentsUpdated?: boolean,
    openModal: () => void,
    closeModal: () => void,
}

const defaultState = {
    isLoading: false,
    modal: false,
    isStudentsUpdated: false,
    openModal: () => {
    },
    closeModal: () => {
    },
}

export const GlobalContext = createContext<IGlobal>(defaultState);
const GlobalProvider = ({children}) => {
    const {currentUser: user} = authContext
    const amplifyClient = useAmplifyClient();

    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [isStudentsUpdated, setIsStudentsUpdated] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    // users mutation subscriptions
    useEffect(() => {
        const createSub = amplifyClient
            .graphql({query: subscriptions.onCreateStudent})
            .subscribe({
                next: ({data}) => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('New student added!')
                },
                error: (error) => {
                    toast.error("Something went wrong")
                    console.warn(error)
                }
            });

        const updateSub = amplifyClient
            .graphql({query: subscriptions.onUpdateStudent})
            .subscribe({
                next: ({data}) => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('Update successfully!')
                },
                error: (error) => {
                    toast.error("Something went wrong")
                    console.warn(error)
                }
            });

        const deleteSub = amplifyClient
            .graphql({query: subscriptions.onDeleteStudent})
            .subscribe({
                next: ({data}) => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('Delete successfully!')
                },
                error: (error) => {
                    toast.error("Something went wrong")
                    console.warn(error)
                }
            });

        return () => {
            createSub.unsubscribe();
            updateSub.unsubscribe();
            deleteSub.unsubscribe();
        }
    }, []);

    const state: IGlobal = {
        isLoading,
        modal,
        openModal,
        closeModal,
        isStudentsUpdated
    }

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider