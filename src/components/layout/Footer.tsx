import React from 'react';
import { Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface NavLink {
    label: string;
    target: string;
    external: boolean;
}

interface FooterProps {
    navLinks?: NavLink[];
}

export const Footer: React.FC<FooterProps> = ({ navLinks = [] }) => {
    return (
        <div className="relative w-full overflow-hidden bg-white transition-colors duration-300 dark:bg-zinc-950">
            {/* Contact Section */}
            <section className="relative z-10 bg-white px-6 py-20 transition-colors duration-300 md:px-12 md:py-32 lg:px-24 dark:bg-zinc-950">
                <div className="mx-auto grid max-w-[85rem] grid-cols-1 items-start gap-16 md:grid-cols-2 lg:gap-24">
                    <div className="max-w-xl">
                        <span className="mb-6 block text-sm font-black tracking-[0.2em] text-indigo-600 uppercase dark:text-indigo-400">CONTÁCTANOS</span>
                        <h2 className="text-5xl leading-tight font-black text-gray-900 sm:text-6xl md:text-7xl dark:text-white">
                            Solicita una <br /> evaluación
                        </h2>
                    </div>

                    <div className="mt-4 flex max-w-lg flex-col gap-10">
                        <p className="text-xl leading-relaxed text-gray-600 dark:text-zinc-400">
                            Descubre cómo nuestra tecnología puede transformar tu destino o negocio. Déjanos tu correo y te contactaremos para una asesoría personalizada.
                        </p>
                        <button
                            onClick={() => window.open('mailto:smarturutcv@gmail.com')}
                            className="flex w-full items-center justify-center gap-3 rounded-full bg-indigo-600 px-10 py-5 text-xl font-bold text-white shadow-xl shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-2xl"
                        >
                            <span>Formar parte</span>
                            <ExternalLink className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Footer */}
            <footer className="relative w-full border-t border-gray-100 bg-white/90 pt-20 pb-12 backdrop-blur-xl transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950/90">
                <div className="mx-auto max-w-[85rem] px-6 md:px-12 lg:px-16">
                    <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-[1.5fr_2fr] lg:gap-20">
                        {/* Branding */}
                        <div className="flex flex-col gap-8">
                            <a href="#" className="block w-48">
                                <img src="/smartur.png" alt="SMARTUR" className="h-auto w-full object-contain dark:contrast-125" />
                            </a>
                            <p className="text-xl font-bold text-indigo-600 italic dark:text-indigo-400">IA que guía, turismo que une</p>
                            <p className="max-w-md text-base leading-relaxed text-gray-500 dark:text-zinc-400">
                                SMARTUR conecta a los viajeros con la esencia de Las Altas Montañas a través de tecnología innovadora y experiencias auténticas, impulsando el desarrollo local y
                                sostenible.
                            </p>
                        </div>

                        {/* Links Columns */}
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
                                                className="text-[15px] font-bold text-gray-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
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
                                        <Mail className="h-5 w-5 text-indigo-500" />
                                        <a href="mailto:smarturutcv@gmail.com" className="text-[15px] font-bold text-gray-500 hover:text-indigo-600 dark:text-zinc-400">
                                            smarturutcv@gmail.com
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Phone className="h-5 w-5 text-indigo-500" />
                                        <a href="tel:+522711730136" className="text-[15px] font-bold text-gray-500 hover:text-indigo-600 dark:text-zinc-400">
                                            271 173 0136
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MapPin className="mt-0.5 h-5 w-5 text-indigo-500" />
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
                                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500"
                                >
                                    <Instagram className="h-6 w-6 text-gray-400 transition-colors group-hover:text-indigo-500" />
                                    <span className="text-sm font-bold text-gray-700 transition-colors group-hover:text-indigo-600 dark:text-zinc-300">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between border-t border-gray-100 pt-10 md:flex-row dark:border-zinc-900">
                        <p className="mb-6 text-sm font-bold text-gray-500 md:mb-0 dark:text-zinc-500">© {new Date().getFullYear()} SMARTUR. Todos los derechos reservados.</p>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black tracking-widest text-gray-400 uppercase">Desarrollado en la</span>
                            <span className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 font-black tracking-[0.2em] text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-900/20 dark:text-indigo-400">
                                UTCV
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
