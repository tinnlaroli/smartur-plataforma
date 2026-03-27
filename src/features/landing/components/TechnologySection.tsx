import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCircle2, BrainCircuit, Compass } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const TechnologySection: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);

    const STEPS = [
        { title: 'how.step1.title', text: 'how.step1.text', Icon: UserCircle2, color: 'var(--color-pink)' },
        { title: 'how.step2.title', text: 'how.step2.text', Icon: BrainCircuit, color: 'var(--color-purple)' },
        { title: 'how.step3.title', text: 'how.step3.text', Icon: Compass, color: 'var(--color-cyan)' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.step-card',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="como-funciona" className="py-24 md:py-36" style={{ background: 'var(--color-bg)' }}>
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-20 text-center">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em]" style={{ color: 'var(--color-purple)' }}>
                        {t('how.label')}
                    </p>
                    <h2 className="landing-heading text-[clamp(2.5rem,6vw,4.5rem)] tracking-tighter" style={{ color: 'var(--color-text)' }}>
                        {t('how.title')}
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    {STEPS.map((step, i) => (
                        <div key={i} className="step-card relative text-center">
                            {/* Connecting Line (Desktop) */}
                            {i < STEPS.length - 1 && (
                                <div className="absolute top-12 left-1/2 w-full hidden md:block" style={{ borderTop: '2px dashed var(--color-border)', zIndex: 0 }} />
                            )}
                            
                            <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-3xl mb-8"
                                style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                                <step.Icon className="h-10 w-10" style={{ color: step.color }} />
                                {/* Step number badge */}
                                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
                                    style={{ background: step.color }}>
                                    {i + 1}
                                </div>
                            </div>
                            
                            <h3 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                                {t(step.title)}
                            </h3>
                            <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--color-text-alt)' }}>
                                {t(step.text)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
