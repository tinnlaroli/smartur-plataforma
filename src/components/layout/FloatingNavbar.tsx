import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage, languages } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import logoSrc from '../../assets/landing/logo.png';

interface NavLink {
    label: string;
    target: string;
    href?: string;
    external: boolean;
}

interface User {
    id?: string;
    name?: string;
    email?: string;
}

interface FloatingNavbarProps {
    navLinks: NavLink[];
    handleStartExperience: () => void;
    scrollToSection: (sectionId: string) => void;
    activeSection: string;
    user: User | null;
    logout: () => void;
}

const PremiumButton: React.FC<{ 
    onClick: (e: React.MouseEvent) => void; 
    children: React.ReactNode;
    color?: string;
    className?: string;
}> = ({ onClick, children, color = 'var(--color-pink)', className = "" }) => (
    <button 
        onClick={onClick} 
        className={`btn-premium group ${className}`}
        style={{ '--bg-color': color, '--hover-text': color } as React.CSSProperties}
    >
        <span>
            <span className="btn-base">{children}</span>
            <span className="btn-hover" aria-hidden="true">{children}</span>
        </span>
    </button>
);

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ navLinks, handleStartExperience, scrollToSection, activeSection, user, logout }) => {
    const { theme, toggleTheme } = useTheme();
    const { lang, changeLanguage, t } = useLanguage();

    const [isNavSmall, setIsNavSmall] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    
    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const currentY = window.scrollY;
        
        // Small state
        if (currentY > 80) {
            setIsNavSmall(true);
        } else {
            setIsNavSmall(false);
        }

        // Hide/Show on scroll
        if (currentY > 400) {
            if (currentY > lastScrollY.current) {
                setIsNavHidden(true);
            } else {
                setIsNavHidden(false);
            }
        } else {
            setIsNavHidden(false);
        }

        lastScrollY.current = currentY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const handleMobileLinkClick = (target: string) => {
        scrollToSection(target);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[var(--ease-out-expo)] 
                ${isNavHidden ? '-translate-y-full' : 'translate-y-0'} 
                ${isNavSmall ? 'is-nav-small pt-2' : 'pt-6'}`}>
                
                <div className="container mx-auto px-4 max-w-[1240px]">
                    <div className="nav-small-bg relative flex items-center justify-between px-6 py-3 rounded-[50px]">
                        
                        {/* Logo */}
                        <a
                            href="#inicio"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('inicio');
                            }}
                            >
                                <img src={logoSrc} alt="SMARTUR" className="h-10 w-auto transition-all duration-300 group-hover:brightness-110" />
                            </a>

                        {/* Desktop Menu */}
                        <nav className="hidden items-center gap-8 md:flex">
                            {navLinks.map((item, idx) => {
                                            const isActive = activeSection === item.target;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => scrollToSection(item.target)}
                                                    className={`relative text-[15px] font-bold tracking-wide transition-colors duration-300 group`}
                                                    style={{ color: isActive ? 'var(--color-pink)' : 'var(--color-text)' }}
                                                >
                                                    {item.label}
                                                    <span className={`absolute -bottom-1 left-0 h-[2px] w-full transition-transform duration-300 origin-right ${isActive ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`} style={{ background: 'var(--color-pink)' }} />
                                                </button>
                                            );
                                        })}
                                    </nav>
            
                                    {/* Actions */}
                                    <div className="flex items-center gap-4 z-[110]">
                                        <div className="hidden items-center gap-3 sm:flex">
                                            <button onClick={toggleTheme} className="control-btn p-2">
                                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                            </button>
                                            <div className="language-switcher relative">
                                                <button 
                                                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                                    className="control-btn flex items-center gap-2 px-3 py-2 text-[14px] font-bold"
                                                >
                                        <Globe className="h-4 w-4" />
                                        <span>{lang.toUpperCase()}</span>
                                    </button>
                                    <AnimatePresence>
                                        {langDropdownOpen && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full right-0 mt-2 rounded-xl shadow-2xl py-2 min-w-[140px]"
                                                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                                            >
                                                {Object.entries(languages).map(([code, name]) => (
                                                    <button
                                                        key={code}
                                                        onClick={() => { changeLanguage(code); setLangDropdownOpen(false); }}
                                                        className="flex w-full items-center justify-between px-4 py-2 text-sm font-bold transition-colors"
                                                        style={{ color: lang === code ? 'var(--color-pink)' : 'var(--color-text)' }}
                                                    >
                                                        <span>{name}</span>
                                                        <span className="text-[10px] uppercase opacity-50">{code}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {user ? (
                                <button onClick={logout} className="p-2 rounded-full transition-colors" style={{ background: 'rgba(255,71,142,0.1)', color: 'var(--color-pink)' }}>
                                    <LogOut size={18} />
                                </button>
                            ) : (
                                <PremiumButton onClick={handleStartExperience} className="hidden sm:block">
                                    {t('nav.start')}
                                </PremiumButton>
                            )}

                            {/* Mobile Toggle */}
                            <button 
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2"
                                style={{ color: 'var(--color-text)' }}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay fixed inset-0 z-[90] flex flex-col items-center justify-center ${isMobileMenuOpen ? 'is-opened' : ''}`}>
                <nav className="flex flex-col items-center gap-8">
                    {navLinks.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleMobileLinkClick(item.target)}
                            className="text-4xl font-black tracking-tighter transition-colors"
                            style={{ 
                                transitionDelay: `${idx * 0.1}s`,
                                color: activeSection === item.target ? 'var(--color-pink)' : 'var(--color-text)' 
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                    {!user && (
                        <button 
                            onClick={() => { handleStartExperience(); setIsMobileMenuOpen(false); document.body.style.overflow = ''; }}
                            className="mt-4 text-2xl font-bold"
                            style={{ color: 'var(--color-purple)' }}
                        >
                            {t('nav.start')}
                        </button>
                    )}
                </nav>
            </div>
        </>
    );
};
