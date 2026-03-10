import React from 'react';
import galardonImg from '../../../assets/landing/galardon.png';
import expocienciasImg from '../../../assets/landing/exp_nacional.png';
import utcvImg from '../../../assets/landing/utcv.png';
import tiImg from '../../../assets/landing/ti.png';

export const TrustBar: React.FC = () => {
    const partners = [
        { src: utcvImg, alt: 'UTCV', className: 'h-12 sm:h-16' },
        { src: tiImg, alt: 'Tecnologías de la Información', className: 'h-12 sm:h-16' },
        { src: galardonImg, alt: 'Galardón Turístico Mi Veracruz', className: 'h-12 sm:h-16' },
        { src: expocienciasImg, alt: 'Expociencias Nacional 2025', className: 'h-12 sm:h-16' },
    ];

    return (
        <section className="w-full border-y border-gray-100 bg-white py-8 transition-colors duration-300 sm:py-12 dark:border-zinc-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 lg:gap-24">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex transform items-center justify-center opacity-40 mix-blend-multiply grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 dark:mix-blend-screen"
                        >
                            <img src={partner.src} alt={partner.alt} className={`${partner.className} w-auto object-contain dark:invert`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
