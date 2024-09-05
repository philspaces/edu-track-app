import {createContext, useContext, useEffect, useState} from "react";
import authContext from "./authContext.tsx";
import {useAmplifyClient} from "./amplifyClientContext.tsx";
import * as subscriptions from "../graphql/subscriptions.js";
import toast from "react-hot-toast";

export interface IGlobal {
    isLoading?: boolean,
    modal?: boolean,
    openModal: () => void,
    closeModal: () => void,
}

const defaultState = {
    isLoading: false,
    modal: false,
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
                    toast.success('New student added!')
                    console.log(data)
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
                    toast.success('Update successfully!')
                    console.log(data)
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
                    toast.success('Delete successfully!')
                    console.log(data)
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
    }

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider