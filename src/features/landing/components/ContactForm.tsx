import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactForm: React.FC = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitting(true);
        await new Promise(res => setTimeout(res, 900));
        setSubmitted(true);
        setSubmitting(false);
        setEmail('');
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const revealElements = section.querySelectorAll('.reveal-fade-up');
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 30, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="contacto" 
            className="cta-minimal bg-white transition-colors duration-300 py-16 sm:py-20 md:py-24 lg:py-32 dark:bg-[var(--color-bg)]"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Title & Label */}
                    <div className="cta-content-left reveal-fade-up">
                        <span className="block text-sm font-black tracking-[0.2em] text-[#9333ea] uppercase mb-4">
                            {t('contact.label')}
                        </span>
                        <h2 className="landing-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight dark:text-white">
                            {t('contact.title')}
                        </h2>
                    </div>

                    {/* Right Column: Text & Input */}
                    <div className="cta-content-right reveal-fade-up">
                        <p className="text-base sm:text-lg text-slate-500 mb-6 sm:mb-8 leading-relaxed max-w-md dark:text-zinc-400">
                            {t('contact.subtitle')}
                        </p>

                        {submitted ? (
                            <div className="flex items-center gap-3 py-4 text-[#a3d14f] font-bold">
                                <CheckCircle className="h-6 w-6" />
                                <span>{t('contact.success')}</span>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="ml-4 text-xs underline opacity-60 hover:opacity-100"
                                >
                                    Enviar otro
                                </button>
                            </div>
                        ) : (
                            <form 
                                onSubmit={handleSubmit} 
                                className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full max-w-lg"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder={t('contact.email.placeholder')}
                                    required
                                    className="w-full flex-grow min-w-0 bg-[var(--color-bg-alt)] border border-[rgba(var(--rgb-text),0.12)] text-[var(--color-text)] rounded-full py-3 sm:py-4 px-4 sm:px-6 outline-none focus:ring-2 focus:ring-[var(--color-purple)] transition-all duration-300 ease-out placeholder:opacity-60 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                                />
                                
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-premium w-full sm:w-auto"
                                >
                                    <span>
                                        <span className="btn-base gap-2 py-3 sm:py-4 px-8 text-base font-bold whitespace-nowrap" style={{ '--bg-color': 'var(--color-pink)' } as any}>
                                            {submitting ? '...' : t('contact.cta.button')}
                                            <ArrowRight className="h-5 w-5" />
                                        </span>
                                        <span className="btn-hover gap-2 py-3 sm:py-4 px-8 text-base font-bold whitespace-nowrap" aria-hidden style={{ '--hover-text': 'var(--color-pink)' } as any}>
                                            {t('contact.cta.button')}
                                            <ArrowRight className="h-5 w-5" />
                                        </span>
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
