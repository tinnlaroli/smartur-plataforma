import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIAL_KEYS = [
    { name: 'testimonials.item1.name', role: 'testimonials.item1.role', text: 'testimonials.item1.content', avatar: '🏔️' },
    { name: 'testimonials.item2.name', role: 'testimonials.item2.role', text: 'testimonials.item2.content', avatar: '☕' },
    { name: 'testimonials.item3.name', role: 'testimonials.item3.role', text: 'testimonials.item3.content', avatar: '🌿' },
];

export const Testimonials: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.testimonial-card',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="testimonios" className="py-24 md:py-36" style={{ background: 'var(--color-bg)' }}>
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em]" style={{ color: 'var(--color-pink)' }}>
                        {t('testimonials.label')}
                    </p>
                    <h2 className="landing-heading text-[clamp(2rem,5vw,4rem)] tracking-tighter" style={{ color: 'var(--color-text)' }}>
                        {t('testimonials.title')}
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {TESTIMONIAL_KEYS.map((item, i) => (
                        <article
                            key={i}
                            className="testimonial-card group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1"
                            style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}
                        >
                            {/* Subtle gradient on hover */}
                            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[2rem]"
                                style={{ background: `linear-gradient(135deg, rgba(252,71,142,0.04), rgba(152,78,253,0.04))` }} />

                            <Quote className="mb-6 h-8 w-8 opacity-20" style={{ color: 'var(--color-pink)' }} />

                            <p className="mb-8 text-base leading-relaxed font-medium" style={{ color: 'var(--color-text-alt)' }}>
                                "{t(item.text)}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                                    style={{ background: 'var(--color-bg)' }}>
                                    {item.avatar}
                                </div>
                                <div>
                                    <p className="font-bold" style={{ color: 'var(--color-text)' }}>{t(item.name)}</p>
                                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-alt)' }}>{t(item.role)}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
