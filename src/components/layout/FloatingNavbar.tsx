import React, { useEffect, useRef, useState } from 'react';
import { useLanguage, languages } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ExternalLink, Globe, ChevronDown, Sun, Moon, LogOut } from 'lucide-react';

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
    role?: string;
    roleId?: number;
    role_id?: number;
}

interface FloatingNavbarProps {
    navLinks: NavLink[];
    handleStartExperience: () => void;
    scrollToSection: (sectionId: string) => void;
    activeSection: string;
    user: User | null;
    logout: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ navLinks, handleStartExperience, scrollToSection, activeSection, user, logout }) => {
    const { theme, toggleTheme } = useTheme();
    const { lang, changeLanguage } = useLanguage();

    const navRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const [isNavSmall, setIsNavSmall] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.language-switcher')) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > 50 && !isNavSmall) {
                setIsNavSmall(true);
                gsap.to(navRef.current, { scale: 0.95, duration: 0.3, ease: 'power2.out' });
                gsap.to(bgRef.current, {
                    backgroundColor: theme === 'dark' ? 'rgba(15, 15, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    duration: 0.3,
                });
            } else if (currentY <= 50 && isNavSmall) {
                setIsNavSmall(false);
                gsap.to(navRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
                gsap.to(bgRef.current, {
                    backgroundColor: theme === 'dark' ? 'rgba(15, 15, 18, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(20px)',
                    duration: 0.3,
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isNavSmall, theme]);

    return (
        <div className="pointer-events-none fixed top-[20px] right-0 left-0 z-[100] flex justify-center px-4">
            <div ref={navRef} className="pointer-events-auto relative w-full max-w-[1100px] overflow-visible rounded-[50px] border border-white/50 shadow-xl dark:border-white/10">
                <div
                    ref={bgRef}
                    className="absolute inset-0 -z-10 rounded-[50px] transition-colors"
                    style={{
                        backgroundColor: theme === 'dark' ? 'rgba(15, 15, 18, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px)',
                    }}
                />

                <div className="flex items-center justify-between px-6 py-3">
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('hero');
                        }}
                        className="group relative flex-shrink-0"
                    >
                        <img src="/smartur.png" alt="SMARTUR" className="h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#914ef5]" />
                    </a>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((item, idx) => {
                            const isActive = activeSection === item.target;

                            if (item.external) {
                                return (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative text-[15px] font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-[#914ef5]' : 'text-gray-800 hover:text-[#914ef5] dark:text-gray-200'} group`}
                                    >
                                        {item.label}
                                        <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-[#914ef5] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                                    </a>
                                );
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.target);
                                    }}
                                    className={`relative text-[15px] font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-[#914ef5]' : 'text-gray-800 hover:text-[#914ef5] dark:text-gray-200'} group`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-right bg-[#914ef5] transition-transform duration-300 ${isActive ? 'origin-left scale-x-100' : 'scale-x-0 group-hover:origin-left group-hover:scale-x-100'}`}
                                    />
                                </button>
                            );
                        })}
                    </nav>

                    <div className="relative flex items-center gap-3 sm:gap-4">
                        <a href="#" className="hidden items-center gap-1.5 text-[15px] font-black tracking-wide text-[#2bb8d6] transition-colors hover:text-[#1e9cb8] sm:flex">
                            Business
                            <ExternalLink className="h-4 w-4" />
                        </a>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden text-sm font-bold text-gray-700 sm:block dark:text-gray-300">{user.name || user.email?.split('@')[0] || 'User'}</span>
                                <button onClick={logout} className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200">
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleStartExperience}
                                className="rounded-full bg-[#ff4d8d] px-6 py-2 font-bold tracking-wide text-white transition-all duration-300 hover:bg-[#ff4d8d]/90"
                            >
                                Comenzar
                            </button>
                        )}

                        <div className="mx-1 hidden h-6 w-[1px] bg-slate-300/60 sm:block" />

                        <div className="language-switcher relative hidden sm:block">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLangDropdownOpen(!langDropdownOpen);
                                }}
                                className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-[14px] font-bold text-gray-800 transition-colors hover:bg-slate-200 dark:bg-zinc-800 dark:text-gray-200"
                            >
                                <Globe className="h-4 w-4" />
                                <span>{lang.toUpperCase()}</span>
                                <ChevronDown className={`h-3 w-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {langDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[140px] overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        {Object.entries(languages).map(([code, name]) => (
                                            <button
                                                key={code}
                                                onClick={() => {
                                                    changeLanguage(code);
                                                    setLangDropdownOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between px-5 py-2.5 text-sm transition-colors ${code === lang ? 'bg-slate-50 font-black text-[#914ef5] dark:bg-zinc-800' : 'text-gray-700 hover:bg-slate-50 hover:text-[#914ef5] dark:text-gray-300'}`}
                                            >
                                                <span className="text-[10px] font-black uppercase opacity-50">{code}</span>
                                                <span className="font-bold">{name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-gray-800 transition-colors hover:bg-slate-200 sm:flex dark:bg-zinc-800 dark:text-gray-200"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
