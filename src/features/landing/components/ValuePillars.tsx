import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ValuePillars: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const pillars = [
        {
            id: 'sostenibilidad',
            title: 'Sostenibilidad',
            description: 'Conectamos con áreas naturales protegidas priorizando el turismo regenerativo.',
            icon: '/leaf.png',
            color: 'var(--color-green)',
            bgStyle: { backgroundColor: 'rgba(var(--rgb-green-accent), 0.1)' },
            borderStyle: { borderColor: 'rgba(var(--rgb-green-accent), 0.2)' },
            iconWidth: 'w-10',
        },
        {
            id: 'identidad',
            title: 'Identidad',
            description: 'Resaltamos la cultura y autenticidad del paisaje de las Altas Montañas.',
            icon: '/mountain.png',
            color: 'var(--color-orange)',
            bgStyle: { backgroundColor: 'rgba(var(--rgb-orange-cta), 0.1)' },
            borderStyle: { borderColor: 'rgba(var(--rgb-orange-cta), 0.2)' },
            iconWidth: 'w-12',
        },
        {
            id: 'inteligencia',
            title: 'Inteligencia',
            description: 'Algoritmos precisos que aprenden de ti para sugerir la experiencia perfecta.',
            icon: '/circuit.png',
            color: 'var(--color-purple)',
            bgStyle: { backgroundColor: 'rgba(var(--rgb-purple-accent), 0.1)' },
            borderStyle: { borderColor: 'rgba(var(--rgb-purple-accent), 0.2)' },
            iconWidth: 'w-10',
        },
        {
            id: 'comunidad',
            title: 'Comunidad',
            description: 'Impulso directo a la red de MiPyMEs locales y su economía circular.',
            icon: '/person.png',
            color: 'var(--color-pink)',
            bgStyle: { backgroundColor: 'rgba(var(--rgb-pink-primary), 0.1)' },
            borderStyle: { borderColor: 'rgba(var(--rgb-pink-primary), 0.2)' },
            iconWidth: 'w-10',
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.pillar-card');

        gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            },
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 transition-colors duration-300 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.id}
                            className="pillar-card flex flex-col rounded-[32px] border p-8 transition-transform duration-300 hover:-translate-y-2"
                            style={{ ...pillar.bgStyle, ...pillar.borderStyle }}
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-900">
                                <img src={pillar.icon} alt={pillar.title} className={`${pillar.iconWidth} h-auto object-contain dark:opacity-90`} />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold" style={{ color: pillar.color }}>{pillar.title}</h3>
                            <p className="leading-relaxed font-medium text-gray-700 dark:text-slate-300">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
