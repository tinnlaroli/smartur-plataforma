import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface User {
    id?: string;
    name?: string;
    email?: string;
}

interface PwaHomeProps {
    isStandalonePwa: boolean;
    user: User | null;
    logout: () => void;
    setShowLoginModal: () => void;
    handleStartExperience: () => void;
    setShowCordobaMap: (show: boolean) => void;
    openInfoCards: () => void;
    bgPatron: string;
    logoArriba: string;
}

export const PwaHome: React.FC<PwaHomeProps> = ({ isStandalonePwa, user, logout, setShowLoginModal, handleStartExperience, setShowCordobaMap, openInfoCards, bgPatron, logoArriba }) => {
    const { t } = useLanguage();
    if (!isStandalonePwa) return null;

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-sans">
            {/* Background patterns */}
            <div
                aria-hidden
                className="fixed top-0 right-0 left-0 z-[1] h-[25%]"
                style={{
                    backgroundImage: `url(${bgPatron})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'blur(3px)',
                    opacity: 0.85,
                    width: '100vw',
                }}
            />

            <div
                aria-hidden
                className="fixed right-0 bottom-0 left-0 z-[1] h-[25%]"
                style={{
                    backgroundImage: `url(${bgPatron})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    filter: 'blur(3px)',
                    opacity: 0.85,
                    width: '100vw',
                }}
            />

            <div className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-transparent via-white to-transparent" />

            {/* Compact Navbar */}
            <header className="absolute top-6 right-6 left-6 z-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="max-w-[160px] truncate text-[12px] font-bold text-gray-500">{user ? user.name || user.email : ''}</span>
                </div>
                <div>
                    {user ? (
                        <button
                            onClick={logout}
                            className="rounded-full border border-gray-100 bg-white/50 px-4 py-2 text-[11px] font-black tracking-widest uppercase shadow-sm backdrop-blur-md transition hover:bg-white/80"
                        >
                            {t('pwaHome.logoutButton')}
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowLoginModal();
                            }}
                            className="relative z-50 rounded-full bg-[#ff4d8d] px-5 py-2 text-[13px] font-black tracking-widest text-white uppercase shadow-lg"
                        >
                            {t('pwaHome.loginButton')}
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-30 flex flex-1 flex-col items-center justify-center px-6 py-10">
                {/* Raised circular logo */}
                <div className="z-40 mb-16 flex h-72 w-72 items-center justify-center overflow-hidden rounded-full border border-gray-50 bg-white p-8 shadow-2xl">
                    <img src={logoArriba} alt="SMARTUR logo" className="h-full w-full object-contain" />
                </div>

                {/* Action Card */}
                <section className="z-40 w-full max-w-xs space-y-6 rounded-[40px] border border-gray-50 bg-white px-6 py-10 shadow-2xl">
                    <div className="space-y-4">
                        <button onClick={handleStartExperience} className="group w-full">
                            <div className="relative flex items-center rounded-full bg-[#ff4d8d] py-1 pr-2 pl-8 hover:bg-[#ff4d8d]/90">
                                <span className="flex-1 py-3 text-left text-2xl leading-none font-black text-white">
                                    {t('pwaHome.whereTop')} <br /> {t('pwaHome.whereBottom')}
                                </span>
                                <div className="ml-2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#ff4d8d] shadow-sm">
                                    <MapPin className="h-8 w-8 fill-[#ff4d8d]" />
                                </div>
                            </div>
                        </button>

                        <button onClick={() => setShowCordobaMap(true)} className="group w-full">
                            <div className="relative flex items-center rounded-full bg-[#ff7d1f] py-1 pr-2 pl-8 hover:bg-[#ff7d1f]/90">
                                <span className="flex-1 py-3 text-left text-2xl leading-none font-black text-white">
                                    {t('pwaHome.regionTop')} <br /> {t('pwaHome.regionBottom')}
                                </span>
                                <div className="ml-2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#ff7d1f] shadow-sm">
                                    <MapPin className="h-8 w-8 fill-[#ff7d1f]" />
                                </div>
                            </div>
                        </button>

                        <button onClick={openInfoCards} className="group w-full">
                            <div className="relative flex items-center rounded-full bg-[#a3d14f] py-1 pr-2 pl-8 hover:bg-[#a3d14f]/90">
                                <span className="flex-1 py-3 text-left text-2xl leading-none font-black text-white">
                                    {t('pwaHome.essenceTop')} <br /> {t('pwaHome.essenceBottom')}
                                </span>
                                <div className="ml-2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#a3d14f] shadow-sm">
                                    <MapPin className="h-8 w-8 fill-[#a3d14f]" />
                                </div>
                            </div>
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="absolute right-0 bottom-6 left-0 z-30 text-center text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">&copy; {new Date().getFullYear()} SMARTUR</footer>
        </div>
    );
};
