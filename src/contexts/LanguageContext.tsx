import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
};

export type LanguageCode = keyof typeof languages;

export const defaultLang: LanguageCode = 'es';

export const ui: Record<LanguageCode, Record<string, string>> = {
    es: {
        'nav.home': 'Inicio',
        'nav.howItWorks': '¿Cómo funciona?',
        'nav.validation': 'Validación',
        'nav.about': 'Sobre Nosotros',
        'nav.places': 'Lugares para visitar',
        'button.get-started': 'Comenzar',
        'accessibility.changeLanguage': 'Cambiar idioma',
        'accessibility.toggleTheme': 'Alternar tema oscuro/claro',
    },
    en: {
        'nav.home': 'Home',
        'nav.howItWorks': 'How it works',
        'nav.validation': 'Validation',
        'nav.about': 'About Us',
        'nav.places': 'Places to visit',
        'button.get-started': 'Start',
        'accessibility.changeLanguage': 'Change language',
        'accessibility.toggleTheme': 'Toggle dark/light theme',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.howItWorks': 'Comment ça marche',
        'nav.validation': 'Validation',
        'nav.about': 'À propos',
        'nav.places': 'Lieux à visiter',
        'button.get-started': 'Démarrer',
        'accessibility.changeLanguage': 'Changer de langue',
        'accessibility.toggleTheme': 'Basculer le thème',
    },
};

interface LanguageContextType {
    lang: LanguageCode;
    changeLanguage: (newLang: string) => void;
    t: (key: string) => string;
    isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<LanguageCode>(defaultLang);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem('smartur-lang') as LanguageCode;
        if (storedLang && storedLang in languages) {
            setLang(storedLang);
        }
        setIsReady(true);
    }, []);

    const changeLanguage = (newLang: string) => {
        if (newLang in languages) {
            setLang(newLang as LanguageCode);
            localStorage.setItem('smartur-lang', newLang);
            document.documentElement.lang = newLang;
        }
    };

    const t = (key: string) => ui[lang]?.[key] || key;

    return <LanguageContext.Provider value={{ lang, changeLanguage, t, isReady }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
