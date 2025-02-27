import {  ReactNode, useState } from 'react';
import { ThemeContext } from './ThemeUtils';



export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};