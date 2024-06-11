"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Modal } from "@uploadcare/blocks";

interface ModalProviderProps {
    children: ReactNode;
}

export type ModalData = {};

type ModalContextType = {
    data: ModalData;
    isOpen: boolean;
    setOpen: (modal: ReactNode, fetchData?: () => Promise<ModalData>) => void;
    setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: ReactNode, fetchData?: () => Promise<ModalData>) => { },
    setClose: () => { }
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const [showingModal, setShowingModal] = useState<ReactNode | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const setOpen = async (
        modal: ReactNode,
        fetchData?: () => Promise<ModalData>
    ) => {
        if (modal) {
            if (fetchData) {
                const newData = await fetchData();
                setData((prevData) => ({ ...prevData, ...newData }));
            }
            setShowingModal(modal);
            setIsOpen(true);
        }
    };

    const setClose = () => {
        setIsOpen(false);
        setData({});
    };

    if (!isMounted) return null;

    return (
        <ModalContext.Provider value={{ data, isOpen, setOpen, setClose }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export default ModalProvider;
