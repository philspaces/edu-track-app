import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useAmplifyClient} from "./amplifyClientContext.tsx";
import * as subscriptions from "../graphql/subscriptions.js";
import toast from "react-hot-toast";

export interface IGlobal {
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
const GlobalProvider = ({children}: { children: ReactNode }) => {
    const amplifyClient = useAmplifyClient();

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
            // @ts-ignore
            .subscribe({
                next: () => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('New student added!')
                },
                error: (error: Error) => {
                    toast.error("Something went wrong")
                    console.warn(error)
                }
            });

        const updateSub = amplifyClient
            .graphql({query: subscriptions.onUpdateStudent})
            // @ts-ignore
            .subscribe({
                next: () => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('Update successfully!')
                },
                error: (error: Error) => {
                    toast.error("Something went wrong")
                    console.warn(error)
                }
            });

        const deleteSub = amplifyClient
            .graphql({query: subscriptions.onDeleteStudent})
            // @ts-ignore
            .subscribe({
                next: () => {
                    setIsStudentsUpdated(prev => !prev)
                    toast.success('Delete successfully!')
                },
                error: (error: Error) => {
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