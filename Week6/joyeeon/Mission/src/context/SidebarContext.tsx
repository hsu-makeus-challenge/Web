import { createContext, ReactNode, useState, useRef, useEffect, useContext } from "react";

interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    sidebarRef: React.RefObject<HTMLDivElement | null>;
}


const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                closeSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, sidebarRef }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
};