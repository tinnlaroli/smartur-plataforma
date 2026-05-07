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
}> = ({
    onClick,
    children,
    color = 'var(--color-orange)',
    className = '',
}) => (
        <button
            onClick={onClick}
            className={`btn-premium group ${className}`}
            style={
                {
                    '--bg-color': color,
                    '--hover-text': color,
                } as React.CSSProperties
            }
        >
            <span>
                <span className="btn-base">{children}</span>
                <span className="btn-hover" aria-hidden="true">
                    {children}
                </span>
            </span>
        </button>
    );

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
    navLinks,
    handleStartExperience,
    scrollToSection,
    activeSection,
    user,
    logout,
}) => {
    const { theme, toggleTheme } = useTheme();
    const { lang, changeLanguage, t } = useLanguage();

    const [isNavSmall, setIsNavSmall] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const currentY = window.scrollY;

        setIsNavSmall(currentY > 80);

        if (currentY > 400) {
            setIsNavHidden(currentY > lastScrollY.current);
        } else {
            setIsNavHidden(false);
        }

        lastScrollY.current = currentY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener('scroll', handleScroll);
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
            <div
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500
    ${isNavHidden ? '-translate-y-full' : 'translate-y-0'}
    ${isNavSmall ? 'pt-2' : 'pt-6'}`}
            >
                <div className="container mx-auto max-w-[1400px] px-4">
                    <div
                        className="relative flex items-center justify-between rounded-[50px] px-8 py-4 backdrop-blur-xl transition-all duration-300"
                        style={{
                            background:
                                'rgba(var(--rgb-bg), 0.75)',
                            border:
                                '1px solid rgba(var(--rgb-text), 0.08)',
                            boxShadow:
                                '0 10px 40px rgba(0,0,0,0.06)',
                        }}
                    >
                        {/* Logo */}

                        <a
                            href="#inicio"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('inicio');
                            }}
                            className="flex items-center"
                        >
                            <img
                                src={logoSrc}
                                alt="SMARTUR"
                                className="h-12 w-auto transition-all duration-300"
                            />
                        </a>

                        {/* Desktop Menu */}

                        <nav className="hidden items-center gap-10 md:flex">
                            {navLinks.map((item, idx) => {
                                const isActive =
                                    activeSection === item.target;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            scrollToSection(item.target)
                                        }
                                        className="group relative text-[16px] font-semibold tracking-[0.02em] transition-colors duration-300"
                                        style={{
                                            color: isActive
                                                ? 'var(--color-purple)'
                                                : 'var(--color-text)',
                                            fontFamily:
                                                'var(--font-family-body)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color =
                                                    'var(--color-purple)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.color =
                                                    'var(--color-text)';
                                            }
                                        }}
                                    >
                                        {item.label}

                                        <span
                                            className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right transition-transform duration-300
                                ${isActive
                                                    ? 'scale-x-100 origin-left'
                                                    : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'
                                                }`}
                                            style={{
                                                background:
                                                    'var(--color-purple)',
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Actions */}

                        <div className="z-[110] flex items-center gap-5">
                            <div className="hidden items-center gap-4 sm:flex">
                                {/* Theme */}

                                <button
                                    onClick={toggleTheme}
                                    className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300"
                                    style={{
                                        background:
                                            'rgba(var(--rgb-text), 0.05)',
                                        color: 'var(--color-text)',
                                        border:
                                            '1px solid rgba(var(--rgb-text),0.08)',
                                    }}
                                >
                                    {theme === 'dark' ? (
                                        <Sun size={19} />
                                    ) : (
                                        <Moon size={19} />
                                    )}
                                </button>

                                {/* Language */}

                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setLangDropdownOpen(
                                                !langDropdownOpen,
                                            )
                                        }
                                        className="flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-all duration-300"
                                        style={{
                                            background:
                                                'rgba(var(--rgb-text), 0.05)',
                                            color: 'var(--color-text)',
                                            border:
                                                '1px solid rgba(var(--rgb-text),0.08)',
                                            fontFamily:
                                                'var(--font-family-body)',
                                        }}
                                    >
                                        <Globe className="h-4 w-4" />

                                        <span>
                                            {lang.toUpperCase()}
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {langDropdownOpen && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                className="absolute top-full right-0 mt-3 min-w-[150px] overflow-hidden rounded-2xl"
                                                style={{
                                                    background:
                                                        'var(--color-bg)',
                                                    border:
                                                        '1px solid rgba(var(--rgb-text),0.08)',
                                                    boxShadow:
                                                        '0 10px 40px rgba(0,0,0,0.08)',
                                                }}
                                            >
                                                {Object.entries(
                                                    languages,
                                                ).map(([code, name]) => (
                                                    <button
                                                        key={code}
                                                        onClick={() => {
                                                            changeLanguage(
                                                                code,
                                                            );

                                                            setLangDropdownOpen(
                                                                false,
                                                            );
                                                        }}
                                                        className="flex w-full items-center justify-between px-4 py-3 text-sm transition-colors duration-300"
                                                        style={{
                                                            color:
                                                                lang === code
                                                                    ? 'var(--color-purple)'
                                                                    : 'var(--color-text)',
                                                            fontFamily:
                                                                'var(--font-family-body)',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        <span>{name}</span>

                                                        <span className="text-[10px] uppercase opacity-50">
                                                            {code}
                                                        </span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* CTA */}

                            {user ? (
                                <button
                                    onClick={logout}
                                    className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300"
                                    style={{
                                        background:
                                            'rgba(var(--rgb-pink-primary),0.12)',
                                        color: 'var(--color-pink)',
                                        border:
                                            '1px solid rgba(var(--rgb-pink-primary),0.15)',
                                    }}
                                >
                                    <LogOut size={19} />
                                </button>
                            ) : (
                                <PremiumButton
                                    onClick={
                                        handleStartExperience
                                    }
                                    className="hidden sm:block"
                                >
                                    {t('nav.start')}
                                </PremiumButton>
                            )}

                            {/* Mobile Toggle */}

                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden"
                                style={{
                                    color: 'var(--color-text)',
                                }}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={30} />
                                ) : (
                                    <Menu size={30} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}

            <div
                className={`fixed inset-0 z-[90] flex flex-col items-center justify-center transition-all duration-500
                ${isMobileMenuOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                    }`}
                style={{
                    background:
                        'rgba(var(--rgb-bg), 0.96)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <nav className="flex flex-col items-center gap-8">
                    {navLinks.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() =>
                                handleMobileLinkClick(item.target)
                            }
                            className="text-4xl font-bold tracking-tight transition-all duration-300"
                            style={{
                                transitionDelay: `${idx * 0.08}s`,
                                color:
                                    activeSection === item.target
                                        ? 'var(--color-pink)'
                                        : 'var(--color-text)',
                                fontFamily:
                                    'var(--font-family-heading)',
                            }}
                        >
                            {item.label}
                        </button>
                    ))}

                    {!user && (
                        <button
                            onClick={() => {
                                handleStartExperience();

                                setIsMobileMenuOpen(false);

                                document.body.style.overflow = '';
                            }}
                            className="mt-6 text-2xl font-semibold"
                            style={{
                                color: 'var(--color-orange)',
                                fontFamily:
                                    'var(--font-family-body)',
                            }}
                        >
                            {t('nav.start')}
                        </button>
                    )}
                </nav>
            </div>
        </>
    );
};