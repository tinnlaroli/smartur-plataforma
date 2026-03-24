import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../auth/components/Loader';
import { FloatingNavbar } from '../../../components/layout/FloatingNavbar';
import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { ValuePillars } from '../components/ValuePillars';
import { SmartEngine } from '../components/SmartEngine';
import { ImpactMap } from '../components/ImpactMap';
import { CordobaMap } from '../components/CordobaMap';
import { Footer } from '../../../components/layout/Footer';
import { PwaHome } from '../../../components/layout/PwaHome';
import { useAuthModal } from '../../auth/context/AuthModalContext';

import bgPatron from '../../../assets/landing/bgPatron.png';
import logoArriba from '../../../assets/landing/logo_arriba.png';

interface InfoCard {
    id: string;
    title: string;
    highlight: string;
    description: string;
    badgeColor: string;
}

const pwaInfoCardsData: InfoCard[] = [
    {
        id: 'company-values',
        title: 'Nuestro ADN',
        highlight: 'Valores SMARTUR',
        description: 'Transparencia, innovación responsable y turismo regenerativo para que cada experiencia genere impacto positivo.',
        badgeColor: 'text-purple-600 bg-purple-100 border-purple-200',
    },
    {
        id: 'pymes',
        title: 'Impulso a PyMES',
        highlight: 'Apoyo a MiPyMES',
        description: 'Conectamos emprendimientos turísticos con viajeros listos para descubrir rutas genuinas.',
        badgeColor: 'text-pink-600 bg-pink-100 border-pink-200',
    },
    {
        id: 'ods',
        title: 'Alineados a las ODS',
        highlight: 'Agenda 2030',
        description: 'Cada recomendación prioriza proyectos con enfoque sostenible y comunidades cuidadas.',
        badgeColor: 'text-green-600 bg-green-100 border-green-200',
    },
];

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
    const { openModal } = useAuthModal();
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');
    const [isStandalonePwa, setIsStandalonePwa] = useState(false);
    const [showCordobaMap, setShowCordobaMap] = useState(false);
    const [infoCards, setInfoCards] = useState(pwaInfoCardsData);
    const [focusedCard, setFocusedCard] = useState<InfoCard | null>(null);
    const [showInfoCards, setShowInfoCards] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const navLinks = [
        { label: 'Inicio', target: 'hero', external: false },
        { label: '¿Cómo funciona?', target: 'smartEngine', external: false },
        { label: 'Validación', target: 'trustBar', external: false },
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

        ['hero', 'trustBar', 'valuePillars', 'smartEngine', 'impactMap'].forEach((id) => {
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
            navigate('/form');
        } else {
            openModal('login');
        }
    }, [user, navigate, openModal]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const openInfoCards = () => setShowInfoCards(true);
    const restoreCards = () => setInfoCards(pwaInfoCardsData);

    return (
        <div className="relative min-h-screen scroll-smooth bg-white font-sans text-gray-800">
            {loading && <Loader onLoaded={() => setLoading(false)} />}

            {!isStandalonePwa && (
                <div className="relative">
                    <main className="relative z-10 w-full overflow-x-hidden">
                        <FloatingNavbar navLinks={navLinks} handleStartExperience={handleStartExperience} scrollToSection={scrollToSection} activeSection={activeSection} user={user} logout={logout} />

                        <div id="hero">
                            <HeroSection handleStartExperience={handleStartExperience} />
                        </div>

                        <div id="trustBar">
                            <TrustBar />
                        </div>

                        <div id="valuePillars">
                            <ValuePillars />
                        </div>

                        <div id="smartEngine">
                            <SmartEngine />
                        </div>

                        <div id="impactMap">
                            <ImpactMap />
                        </div>

                        <section className="relative flex justify-center overflow-hidden bg-slate-950 px-4 py-24 text-center sm:py-32">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="relative z-10 mx-auto max-w-3xl">
                                <h2 className="mb-12 text-4xl leading-none font-black text-white sm:text-7xl">
                                    ¿Listo para <br /> redescubrir las <br />
                                    <span className="text-[#a3d14f]">Altas Montañas</span>?
                                </h2>
                                <button
                                    onClick={handleStartExperience}
                                    className="rounded-full bg-[#ff4d8d] px-12 py-6 text-xl font-black tracking-widest text-white uppercase shadow-2xl shadow-[#ff4d8d]/20 transition-all duration-300 hover:scale-110 hover:bg-[#ff4d8d]/90 active:scale-95 sm:text-2xl"
                                >
                                    Comenzar mi aventura
                                </button>
                            </div>
                        </section>

                        <Footer navLinks={navLinks} />
                    </main>
                </div>
            )}

            {showCordobaMap && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto bg-white">
                    <button
                        onClick={() => setShowCordobaMap(false)}
                        className="fixed top-6 right-6 z-[1001] rounded-full border border-gray-100 bg-white p-4 shadow-2xl transition-colors hover:bg-gray-50"
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

            {/* Simplified generic modals for PWA since we aren't moving the old modal system */}
            {focusedCard && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md">
                    <div className="relative w-full max-w-sm rounded-[40px] bg-white p-8 shadow-2xl">
                        <button onClick={() => setFocusedCard(null)} className="absolute top-6 right-6 font-black text-gray-400">
                            ✕
                        </button>
                        <span className={`mb-6 inline-flex rounded-full border px-4 py-1.5 text-[10px] font-black tracking-widest uppercase ${focusedCard.badgeColor}`}>{focusedCard.highlight}</span>
                        <h3 className="mb-4 text-2xl leading-tight font-black text-gray-900">{focusedCard.title}</h3>
                        <p className="mb-8 leading-relaxed font-medium text-gray-600">{focusedCard.description}</p>
                        <button onClick={() => setFocusedCard(null)} className="w-full rounded-full bg-[#ff4d8d] py-4 font-black text-white shadow-lg">
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {showInfoCards && (
                <div className="fixed inset-0 z-[9900] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
                    <div className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-[40px] border border-gray-50 bg-white shadow-2xl">
                        <button onClick={() => setShowInfoCards(false)} className="absolute top-6 right-6 z-50 font-black text-gray-400">
                            ✕
                        </button>
                        <div className="border-b border-gray-50 p-8">
                            <p className="mb-2 text-xs font-black tracking-[0.2em] text-[#ff4d8d] uppercase">Sobre SMARTUR</p>
                            <h3 className="mb-2 text-3xl leading-none font-black text-gray-900">Conoce nuestra esencia</h3>
                            <p className="text-sm font-medium text-gray-400">Toca una tarjeta para ver más detalle.</p>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto p-6">
                            {infoCards.length > 0 ? (
                                infoCards.map((card) => (
                                    <div
                                        key={card.id}
                                        onClick={() => setFocusedCard(card)}
                                        className="cursor-pointer rounded-[32px] border-2 border-transparent bg-gray-50 p-6 transition-all hover:border-indigo-100 active:scale-95"
                                    >
                                        <span className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[9px] font-black tracking-widest uppercase ${card.badgeColor}`}>{card.highlight}</span>
                                        <h4 className="mb-2 text-xl font-black text-gray-900">{card.title}</h4>
                                        <p className="line-clamp-2 text-sm font-medium text-gray-500">{card.description}</p>
                                    </div>
                                ))
                            ) : (
                                <button onClick={restoreCards} className="w-full py-4 font-black text-[#ff4d8d]">
                                    Restaurar tarjetas
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
