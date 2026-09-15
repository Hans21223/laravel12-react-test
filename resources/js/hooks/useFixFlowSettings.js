import { useEffect, useState } from 'react';

export default function useFixFlowSettings() {
    const [language, setLanguage] = useState(
        localStorage.getItem('fixflow-language') || 'th'
    );

    const [theme, setTheme] = useState(
        localStorage.getItem('fixflow-theme') || 'light'
    );

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguage(event.detail);
        };

        const handleThemeChange = (event) => {
            setTheme(event.detail);
        };

        window.addEventListener(
            'fixflow-language-change',
            handleLanguageChange
        );

        window.addEventListener(
            'fixflow-theme-change',
            handleThemeChange
        );

        return () => {
            window.removeEventListener(
                'fixflow-language-change',
                handleLanguageChange
            );

            window.removeEventListener(
                'fixflow-theme-change',
                handleThemeChange
            );
        };
    }, []);

    return {
        language,
        theme,
        isThai: language === 'th',
        isEnglish: language === 'en',
    };
}