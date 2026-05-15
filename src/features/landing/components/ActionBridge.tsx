import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Map, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { prefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

interface ActionBridgeProps {
  handleStartExperience: () => void;
}

export const ActionBridge: React.FC<ActionBridgeProps> = ({ handleStartExperience }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bridge-action',
        { opacity: 0, y: 48, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.16, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="action-bridge-section relative z-20 py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="bridge-card relative p-4 md:p-8 text-center max-w-5xl mx-auto">
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            
            {/* Tourist CTA — purple-tinted card, both light and dark mode */}
            <button
              onClick={handleStartExperience}
              className="bridge-action sy-lift-card group relative w-full md:w-auto min-w-[320px] shadow-xl hover:shadow-2xl p-4 rounded-[2rem] transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(var(--rgb-pink-primary), 0.08)', border: '1px solid rgba(var(--rgb-pink-primary), 0.22)' }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(var(--rgb-pink-primary), 0.14)', color: 'var(--color-pink)' }}>
                  <Map size={32} />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <span className="block text-xl font-bold transition-colors" style={{ color: 'var(--color-text)' }}>{t('actionBridge.tourist.label')}</span>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <span className="overflow-hidden text-sm font-medium block pt-1" style={{ color: 'var(--color-text-alt)' }}>
                      {t('actionBridge.tourist.description')}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(var(--rgb-pink-primary), 0.12)', color: 'var(--color-pink)' }}>
                  <ArrowRight size={20} />
                </div>
              </div>
            </button>

            {/* Separator */}
            <div className="hidden md:block w-px h-12" style={{ background: 'var(--color-border)' }}></div>

            {/* Business CTA — grey card, both light and dark mode */}
            <a
              href="https://tinnlaroli.github.io/smartur-landing/"
              target="_blank"
              rel="noopener noreferrer"
              className="bridge-action sy-lift-card group relative w-full md:w-auto min-w-[320px] shadow-xl hover:shadow-2xl p-4 rounded-[2rem] transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: 'var(--color-bg)', color: 'var(--color-text-alt)' }}>
                  <Building2 size={32} />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <span className="block text-xl font-bold transition-colors" style={{ color: 'var(--color-text)' }}>{t('actionBridge.business.label')}</span>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <span className="overflow-hidden text-sm font-medium block pt-1" style={{ color: 'var(--color-text-alt)' }}>
                      {t('actionBridge.business.description')}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--color-border)', color: 'var(--color-text-alt)' }}>
                  <ExternalLink size={20} />
                </div>
              </div>
            </a>


          </div>
        </div>
      </div>
    </section>
  );
};
