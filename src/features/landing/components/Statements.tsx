import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface StatementsProps { handleStartExperience?: () => void; }

function rotateSquarePercent(angle: number, sizePercent: number, w: number, h: number) {
    const square = [{ x: -0.5, y: -0.5 }, { x: 0.5, y: -0.5 }, { x: 0.5, y: 0.5 }, { x: -0.5, y: 0.5 }];
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const sz = sizePercent * (w < h ? w / 100 : h / 100);
    return square.map(p => {
        const rx = p.x * sz * cos - p.y * sz * sin;
        const ry = p.x * sz * sin + p.y * sz * cos;
        return { x: 50 + (rx / w) * 100, y: 50 + (ry / h) * 100 };
    });
}

export const Statements: React.FC<StatementsProps> = ({ handleStartExperience }) => {
    const { t } = useLanguage();
    const innerRef = useRef<HTMLDivElement>(null);

    const SECTIONS = [
        {
            id: 'hook',
            title: () => t('story.hook.title'),
            text: () => t('story.hook.text'),
            bg: 'var(--color-bg)',
            textColor: 'var(--color-text)',
            accentColor: 'var(--color-purple)',
        },
        {
            id: 'conflict',
            title: () => t('story.conflict.title'),
            text: () => t('story.conflict.text'),
            bg: 'var(--color-pink)',
            textColor: '#fff',
            accentColor: 'rgba(255,255,255,0.7)',
        },
        {
            id: 'guide',
            title: () => t('story.guide.title'),
            text: () => t('story.guide.text'),
            bg: 'var(--color-cyan)',
            textColor: '#fff',
            accentColor: 'rgba(255,255,255,0.7)',
        },
        {
            id: 'cta',
            title: () => t('story.cta.title'),
            text: () => t('story.cta.text'),
            bg: 'var(--color-bg)',
            textColor: 'var(--color-text)',
            accentColor: 'var(--color-purple)',
        },
    ];

    useEffect(() => {
        const inner = innerRef.current;
        if (!inner) return;

        const panels = Array.from(inner.querySelectorAll<HTMLElement>('.st-panel'));
        const sizes = [window.innerWidth, window.innerHeight];
        const initRotation = 35;
        const theta = (initRotation * Math.PI) / 180;
        const factor = (Math.abs(Math.cos(theta)) + Math.abs(Math.sin(theta))) *
            (window.innerHeight > window.innerWidth ? 1.8 : 1.0);

        // Stack all panels absolutely — CSS already positions them, GSAP just adjusts z-index
        panels.forEach((el, i) => {
            gsap.set(el, {
                zIndex: panels.length - i, // panel 0 on top
                clipPath: 'none',
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: inner,
                pin: true,
                scrub: true,
                start: 'top top',
                end: () => `+=${window.innerHeight * (window.innerWidth < 1024 ? 2 : 3)}`,
                invalidateOnRefresh: true,
                onRefresh: () => { sizes[0] = window.innerWidth; sizes[1] = window.innerHeight; },
            },
        });

        // For each panel except the last: animate clip-path shrinking to reveal next panel
        panels.forEach((el, i) => {
            if (i === panels.length - 1) return; // ignoreLast — stays fully visible at bottom

            const p = { prog: 0 };
            tl.fromTo(p, { prog: 0 }, {
                prog: 1,
                duration: 1,
                ease: 'none',
                onUpdate() {
                    const progress = p.prog;
                    const [ww, wh] = sizes;
                    const angle = initRotation + progress * 75;
                    const maxSide = Math.max(ww, wh) * factor;
                    const initSize = (maxSide / Math.min(ww, wh)) * 100;
                    const sizePercent = initSize * (1 - progress);
                    const rotated = rotateSquarePercent(angle, sizePercent, ww, wh);
                    el.style.clipPath = `polygon(${rotated.map(pt => `${pt.x}% ${pt.y}%`).join(', ')})`;
                }
            });
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="sy-statements relative z-10">
            {/*
              .sy-rect-inner: height 100dvh, position relative, overflow hidden.
              All panels are absolute full-size, stacked via CSS z-index set by GSAP.
              Clip-path animation acts as a rotating-square "curtain" that peels away the top panel
              to reveal the one below — no opacity juggling needed.
            */}
            <div
                ref={innerRef}
                className="sy-rect-inner"
                style={{ position: 'relative', height: '100dvh', minHeight: 400, overflow: 'hidden' }}
            >
                {SECTIONS.map((section, idx) => (
                    <div
                        key={section.id}
                        className="st-panel"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            textAlign: 'center',
                            background: section.bg,
                            color: section.textColor,
                            willChange: 'clip-path',
                        }}
                    >
                        <div style={{ maxWidth: '56rem', width: '100%' }}>
                            <h2
                                className="landing-heading"
                                style={{
                                    fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.04em',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    marginBottom: '1rem',
                                    color: section.textColor,
                                }}
                            >
                                {section.title().split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {i === 0 ? line : <><br /><span style={{ color: section.accentColor }}>{line}</span></>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            <p
                                style={{
                                    maxWidth: '40em',
                                    margin: '0 auto',
                                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    color: section.textColor,
                                    opacity: 0.85,
                                }}
                            >
                                {section.text()}
                            </p>

                            {idx === SECTIONS.length - 1 && handleStartExperience && (
                                <div style={{ marginTop: '3rem', display: 'inline-block' }}>
                                    <button onClick={handleStartExperience} className="btn-premium group">
                                        <span>
                                            <span className="btn-base gap-3 px-10 py-5 text-xl font-bold"
                                                style={{ '--bg-color': 'var(--color-purple)' } as any}>
                                                {t('story.cta.button')}
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                            <span className="btn-hover gap-3 px-10 py-5 text-xl font-bold" aria-hidden
                                                style={{ '--hover-text': 'var(--color-purple)' } as any}>
                                                {t('story.cta.button')}
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
