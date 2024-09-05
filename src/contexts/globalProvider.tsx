import {createContext, useContext, useState} from "react";
import authContext from "./authContext.tsx";

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

    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

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