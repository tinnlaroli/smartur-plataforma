import React, { useState, useEffect } from 'react';
import { Instagram, Mail, Phone, MapPin, Download } from 'lucide-react';

interface NavLink {
    label: string;
    target: string;
    external: boolean;
}

interface FooterProps {
    navLinks?: NavLink[];
}

export const Footer: React.FC<FooterProps> = ({ navLinks = [] }) => {
    const [latestVersion, setLatestVersion] = useState("v1.0.0");

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch("https://api.github.com/repos/tinnlaroli/smartur-movil/releases/latest");
                if (response.ok) {
                    const data = await response.json();
                    setLatestVersion(data.tag_name);
                }
            } catch (e) {
                console.error("Error fetching latest release:", e);
            }
        };
        fetchVersion();
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-white transition-colors duration-300 dark:bg-[var(--color-bg)]">
            {/* Main Footer */}
            <footer className="relative w-full border-t border-gray-100 bg-white/90 pt-20 pb-12 backdrop-blur-xl transition-colors duration-300 dark:border-zinc-900 dark:bg-[rgba(var(--rgb-bg),0.92)]">
                <div className="mx-auto max-w-[85rem] px-6 md:px-12 lg:px-16">
                    <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-[1.5fr_2fr] lg:gap-20">
                        {/* Branding */}
                        <div className="flex flex-col gap-8">
                            <a href="#" className="block w-48">
                                <img src="/smartur.png" alt="SMARTUR" className="h-auto w-full object-contain dark:contrast-125" />
                            </a>
                            <p className="text-xl font-bold text-[var(--color-purple)] italic dark:text-[var(--color-purple)]">IA que guía, turismo que une</p>
                            <p className="max-w-md text-base leading-relaxed text-gray-500 dark:text-zinc-400">
                                SMARTUR conecta a los viajeros con la esencia de Las Altas Montañas a través de tecnología innovadora y experiencias auténticas, impulsando el desarrollo local y
                                sostenible.
                            </p>
                        </div>

                        {/* Links Columns */}
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <h3 className="mb-8 text-sm font-black tracking-widest text-gray-900 uppercase dark:text-white">Accesos Rápidos</h3>
                                <ul className="flex flex-col gap-5">
                                    {(navLinks.length > 0
                                        ? navLinks
                                        : [
                                            { label: 'Inicio', target: 'hero' },
                                            { label: '¿Cómo funciona?', target: 'smartEngine' },
                                            { label: 'Validación', target: 'trustBar' },
                                        ]
                                    ).map((link: any, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={`#${link.target}`}
                                                className="text-[15px] font-bold text-gray-500 transition-colors hover:text-[var(--color-cyan)] dark:text-zinc-400 dark:hover:text-[var(--color-cyan)]"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-8 text-sm font-black tracking-widest text-gray-900 uppercase dark:text-white">Contacto</h3>
                                <ul className="flex flex-col gap-6">
                                    <li className="flex items-center gap-4">
                                        <Mail className="h-5 w-5 text-[var(--color-purple)]" />
                                        <a href="mailto:smarturutcv@gmail.com" className="text-[15px] font-bold text-gray-500 hover:text-[var(--color-cyan)] dark:text-zinc-400">
                                            smarturutcv@gmail.com
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Phone className="h-5 w-5 text-[var(--color-purple)]" />
                                        <a href="tel:+522711730136" className="text-[15px] font-bold text-gray-500 hover:text-[var(--color-cyan)] dark:text-zinc-400">
                                            271 173 0136
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MapPin className="mt-0.5 h-5 w-5 text-[var(--color-purple)]" />
                                        <span className="text-[15px] font-bold text-gray-500 dark:text-zinc-400">Avenida Universidad 350, 94910 Cuitláhuac, Ver.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-8 text-sm font-black tracking-widest text-gray-900 uppercase dark:text-white">Síguenos</h3>
                                <a
                                    href="https://www.instagram.com/smar_tur"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-cyan)] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[var(--color-cyan)]"
                                >
                                    <Instagram className="h-6 w-6 text-gray-400 transition-colors group-hover:text-[var(--color-cyan)]" />
                                    <span className="text-sm font-bold text-gray-700 transition-colors group-hover:text-[var(--color-cyan)] dark:text-zinc-300">Instagram</span>
                                </a>
                            </div>

                            <div>
                                <h3 className="mb-8 text-sm font-black tracking-widest text-gray-900 uppercase dark:text-white">App Móvil</h3>
                                <div className="flex flex-col gap-4">
                                    <span className="text-[15px] font-bold text-gray-500 dark:text-zinc-400">Última versión: {latestVersion}</span>
                                    <a
                                        href="https://github.com/tinnlaroli/smartur-movil/releases/latest/download/app-release.apk"
                                        className="group flex w-fit items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/40"
                                    >
                                        <Download className="h-5 w-5" />
                                        Descargar APK
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-t border-gray-100 pt-10 md:flex-row dark:border-zinc-900">
                        <p className="mb-6 text-sm font-bold text-gray-500 md:mb-0 dark:text-zinc-500">© {new Date().getFullYear()} SMARTUR. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
