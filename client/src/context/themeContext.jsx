import { useState } from 'react';
import { createContext } from 'react';

export const themeContext = createContext({
    currentTheme: '',
    setCurrentTheme: () => { },
    theme: {
        theme1: {
            bgColor: ''
        },
        theme2: {
            bgColor: ''
        },
        theme3: {
            bgColor: ''
        },
        theme4: {
            bgColor: ''
        },
        theme5: {
            bgColor: ''
        }
    }
});


export default function ThemeContext({ children }) {
    const [currentTheme, setCurrentTheme] = useState("theme1")

    return (
        <themeContext.Provider value={{
            currentTheme,
            setCurrentTheme,
            theme: {
                theme1: {
                    bgColor: 'homediv'
                },
                theme2: {
                    bgColor: 'homediv2'
                },
                theme3: {
                    bgColor: 'homediv3'
                },
                theme4: {
                    bgColor: 'homediv4'
                },
                theme5: {
                    bgColor: 'homediv5'
                }
            }
        }}>
            {children}
        </themeContext.Provider>
    );
}