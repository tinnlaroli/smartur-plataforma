import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import SmartURLoader from '../../auth/components/SmartURLoader';
import { FloatingNavbar } from '../../../components/layout/FloatingNavbar';
import { HeroSection } from '../components/HeroSection';
import { FlightDivider } from '../components/FlightDivider';
import { VideoSection } from '../components/VideoSection';
import { TechnologySection } from '../components/TechnologySection';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { Statements } from '../components/Statements';
import { ImpactSection } from '../components/ImpactSection';
import { ContactForm } from '../components/ContactForm';
import { CordobaMap } from '../components/CordobaMap';
import { Faqs } from '../components/Faqs';
import { Footer } from '../../../components/layout/Footer';
import { PwaHome } from '../../../components/layout/PwaHome';
import { useAuthModal } from '../../auth/context/AuthModalContext';
import { FormModal } from '../../form/components/FormModal';

import '../styles/Landing.css';
import bgPatron from '../../../assets/landing/bgPatron.png';
import logoArriba from '../../../assets/landing/logo.png';

interface InfoCard {
    id: string;
    title: string;
    highlight: string;
    description: string;
    badgeColor: string;
}

interface User {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    roleId?: number;
    role_id?: number;
}

export default function Landing() {
    const navigate = useNavigate();
    const location = useLocation();
    const { openModal } = useAuthModal();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('inicio');
    const [isStandalonePwa, setIsStandalonePwa] = useState(false);
    const [showCordobaMap, setShowCordobaMap] = useState(false);
    const [focusedCard, setFocusedCard] = useState<InfoCard | null>(null);
    const [showInfoCards, setShowInfoCards] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);

    useEffect(() => {
        if (location.state?.openForm) {
            setIsFormModalOpen(true);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    const { t } = useLanguage();

    const infoCards = useMemo<InfoCard[]>(
        () => [
            {
                id: 'company-values',
                title: t('pwa.info.company-values.title'),
                highlight: t('pwa.info.company-values.highlight'),
                description: t('pwa.info.company-values.description'),
                badgeColor: 'text-purple-600 bg-purple-100 border-purple-200',
            },
            {
                id: 'pymes',
                title: t('pwa.info.pymes.title'),
                highlight: t('pwa.info.pymes.highlight'),
                description: t('pwa.info.pymes.description'),
                badgeColor: 'text-pink-600 bg-pink-100 border-pink-200',
            },
            {
                id: 'ods',
                title: t('pwa.info.ods.title'),
                highlight: t('pwa.info.ods.highlight'),
                description: t('pwa.info.ods.description'),
                badgeColor: 'text-green-600 bg-green-100 border-green-200',
            },
        ],
        [t],
    );

    const navLinks = [
        { label: t('nav.home'), target: 'inicio', external: false },
        { label: t('nav.region'), target: 'region', external: false },
        { label: t('nav.technology'), target: 'tecnologia', external: false },
        { label: t('nav.about'), target: 'nosotros', external: false },
        { label: t('nav.impact'), target: 'impacto', external: false },
        { label: t('nav.testimonials'), target: 'testimonios', external: false },
        { label: t('nav.contact'), target: 'contacto', external: false },
        { label: t('nav.faqs'), target: 'faqs', external: false },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.1, rootMargin: '-100px 0px -50% 0px' },
        );

        ['inicio', 'como-funciona', 'region', 'tecnologia', 'nosotros', 'impacto', 'testimonios', 'faqs', 'contacto'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const updateStandalone = () => {
            const isMobileWidth = window.innerWidth <= 768;
            setIsStandalonePwa(isMobileWidth);
        };
        updateStandalone();
        window.addEventListener('resize', updateStandalone);
        return () => window.removeEventListener('resize', updateStandalone);
    }, []);

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleStartExperience = useCallback(() => {
        if (user) {
            setIsFormModalOpen(true);
        } else {
            openModal('login');
        }
    }, [user, openModal]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const openInfoCards = () => setShowInfoCards(true);

    return (
        <div className="relative min-h-screen bg-white font-sans text-gray-800 dark:bg-[var(--color-bg)] dark:text-zinc-200">
            {loading && <SmartURLoader onFinished={() => setLoading(false)} />}

            {!isStandalonePwa && (
                <div className="relative overflow-x-hidden">
                    <FloatingNavbar 
                        navLinks={navLinks} 
                        handleStartExperience={handleStartExperience} 
                        scrollToSection={scrollToSection} 
                        activeSection={activeSection} 
                        user={user} 
                        logout={logout} 
                    />

                    <main className="relative z-10 w-full">
                        <div id="inicio">
                            <HeroSection handleStartExperience={handleStartExperience} />
                        </div>

                        <FlightDivider handleStartExperience={handleStartExperience} />

                        <Statements handleStartExperience={handleStartExperience} />

                        <div id="region">
                            <VideoSection />
                        </div>

                        <div id="tecnologia">
                            <TechnologySection />
                        </div>

                        <div id="nosotros">
                            <About />
                        </div>

                        <div id="impacto">
                            <ImpactSection />
                        </div>

                        <Testimonials />

                        <div id="contacto">
                            <ContactForm />
                            <Faqs />
                        </div>

                        <Footer navLinks={navLinks} />
                    </main>
                </div>
            )}

            {showCordobaMap && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto bg-white dark:bg-zinc-950">
                    <button
                        onClick={() => setShowCordobaMap(false)}
                        className="fixed top-6 right-6 z-[1001] rounded-full border border-gray-100 bg-white p-4 shadow-2xl transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200"
                    >
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <CordobaMap />
                </div>
            )}

            <PwaHome
                isStandalonePwa={isStandalonePwa}
                user={user}
                logout={logout}
                setShowLoginModal={() => openModal('login')}
                handleStartExperience={handleStartExperience}
                setShowCordobaMap={setShowCordobaMap}
                openInfoCards={openInfoCards}
                bgPatron={bgPatron}
                logoArriba={logoArriba}
            />

            {/* PWA Info Cards Modals */}
            {focusedCard && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md">
                    <div className="relative w-full max-w-sm rounded-[40px] bg-white p-8 shadow-2xl dark:bg-zinc-950 dark:text-zinc-200 border border-gray-100 dark:border-zinc-800">
                        <button onClick={() => setFocusedCard(null)} className="absolute top-6 right-6 font-black text-gray-400 text-2xl dark:text-zinc-500">✕</button>
                        <span className={`mb-6 inline-flex rounded-full border px-4 py-1.5 text-[10px] font-black tracking-widest uppercase ${focusedCard.badgeColor}`}>{focusedCard.highlight}</span>
                        <h3 className="mb-4 text-2xl leading-tight font-black text-gray-900 dark:text-zinc-100">{focusedCard.title}</h3>
                        <p className="mb-8 leading-relaxed font-medium text-gray-600 dark:text-zinc-300">{focusedCard.description}</p>
                        <button onClick={() => setFocusedCard(null)} className="w-full rounded-full bg-[#ff4d8d] py-4 font-black text-white shadow-lg">{t('pwa.modal.understood')}</button>
                    </div>
                </div>
            )}

            {showInfoCards && (
                <div className="fixed inset-0 z-[9900] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
                    <div className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-[40px] border border-gray-50 bg-white shadow-2xl dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-200">
                        <button onClick={() => setShowInfoCards(false)} className="absolute top-6 right-6 z-50 font-black text-gray-400 text-2xl dark:text-zinc-500">✕</button>
                        <div className="border-b border-gray-50 p-8 pt-10 dark:border-zinc-800">
                            <p className="mb-2 text-xs font-black tracking-[0.2em] text-[#ff4d8d] uppercase">{t('pwa.modal.aboutLabel')}</p>
                            <h3 className="mb-2 text-3xl leading-none font-black text-gray-900 dark:text-zinc-100">{t('pwa.modal.title')}</h3>
                            <p className="text-sm font-medium text-gray-400 dark:text-zinc-300">{t('pwa.modal.subtitle')}</p>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto p-6 pb-10">
                            {infoCards.map((card) => (
                                <div
                                    key={card.id}
                                    onClick={() => setFocusedCard(card)}
                                    className="cursor-pointer rounded-[32px] border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-indigo-100 active:scale-95 dark:bg-zinc-900 dark:hover:border-indigo-200"
                                >
                                    <span className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[9px] font-black tracking-widest uppercase ${card.badgeColor}`}>{card.highlight}</span>
                                    <h4 className="mb-2 text-xl font-black text-gray-900 dark:text-zinc-100">{card.title}</h4>
                                    <p className="line-clamp-2 text-sm font-medium text-gray-500 dark:text-zinc-300">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <FormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
        </div>
    );
}
