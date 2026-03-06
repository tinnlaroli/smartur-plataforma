import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
    onLoaded?: () => void;
    isLoading?: boolean; // Nueva prop para control manual
}

const Loader: React.FC<LoaderProps> = ({ onLoaded, isLoading = true }) => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const vortexContainerRef = useRef<HTMLDivElement>(null);
    const logoGlowRef = useRef<HTMLDivElement>(null);
    const explosionOverlayRef = useRef<HTMLDivElement>(null);
    const orbitalRingsRef = useRef<(HTMLDivElement | null)[]>([]);
    const ringIconsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [isVisible, setIsVisible] = useState(true);
    const finishTriggered = useRef(false);

    useEffect(() => {
        const loader = loaderRef.current;
        if (!loader) return;

        const counter = { val: 0 };
        const tl = gsap.timeline();

        const logoGlow = logoGlowRef.current;
        const orbitalRings = orbitalRingsRef.current;
        const ringIcons = ringIconsRef.current;
        const explosionOverlay = explosionOverlayRef.current;
        const vortexContainer = vortexContainerRef.current;
        const progressBar = progressBarRef.current;
        const counterEl = counterRef.current;

        // Phase 1: Fade In
        tl.to(logoGlow, { opacity: 0.6, duration: 0.5, ease: 'power2.out' }, 0.2);
        tl.to('.loader-counter', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.3);
        tl.to(orbitalRings, { opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.4);

        // Initial rotation set
        if (ringIcons.length === 4) {
            gsap.set(ringIcons, { rotation: (i) => i * 90 });
        }

        const rotateLoop = gsap.to(ringIcons, {
            rotation: '+=360',
            duration: 2,
            repeat: -1,
            ease: 'none',
        });

        const progressTween = gsap.to(counter, {
            val: 90,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate() {
                if (counterEl) counterEl.textContent = String(Math.round(counter.val));
                if (progressBar) progressBar.style.width = Math.round(counter.val) + '%';
            },
        });

        const finishLoading = () => {
            if (finishTriggered.current) return;
            finishTriggered.current = true;

            progressTween.kill();

            const exitTl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    if (onLoaded) onLoaded();
                },
            });

            exitTl.to(counter, {
                val: 100,
                duration: 0.4,
                ease: 'power2.out',
                onUpdate() {
                    if (counterEl) counterEl.textContent = String(Math.round(counter.val));
                    if (progressBar) progressBar.style.width = Math.round(counter.val) + '%';
                },
            });

            exitTl.to(rotateLoop, { timeScale: 5, duration: 0.5 }, 0);

            exitTl.to(
                ringIcons,
                {
                    filter: 'blur(20px)',
                    scale: 1.5,
                    duration: 0.6,
                    ease: 'power2.in',
                },
                0.3
            );

            exitTl.to(
                explosionOverlay,
                {
                    opacity: 1,
                    scale: 2,
                    duration: 0.6,
                    ease: 'power2.out',
                },
                0.4
            );

            exitTl.to(
                ['.loader-counter', '.loader-progress', vortexContainer],
                {
                    opacity: 0,
                    duration: 0.3,
                },
                0.4
            );

            exitTl.to(
                loader,
                {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                },
                0.8
            );
        };

        // Si ya no estamos cargando, terminamos inmediatamente la fase de espera
        if (!isLoading) {
            finishLoading();
        }

        // De todas formas ponemos un timeout máximo por seguridad
        const loadTimeout = setTimeout(finishLoading, 4000);

        return () => {
            clearTimeout(loadTimeout);
            tl.kill();
            rotateLoop.kill();
            progressTween.kill();
        };
    }, [onLoaded, isLoading]);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
        @keyframes progressShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: progressShimmer 1.5s linear infinite;
          background-size: 200% 100%;
        }
      `}</style>

            <div
                ref={loaderRef}
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#121212] pointer-events-auto"
            >
                {/* Vortex Container */}
                <div
                    ref={vortexContainerRef}
                    className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
                >
                    <div
                        ref={logoGlowRef}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full blur-[30px] opacity-0 -z-10"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.4), transparent)',
                        }}
                    ></div>

                    {/* Orbital Rings */}
                    {[
                        {
                            name: 'circuit',
                            icon: '/circuit.png',
                            color: 'text-purple-500',
                            borderColor: 'border-purple-500',
                        },
                        {
                            name: 'leaf',
                            icon: '/leaf.png',
                            color: 'text-green-500',
                            borderColor: 'border-green-500',
                        },
                        {
                            name: 'mountain',
                            icon: '/mountain.png',
                            color: 'text-orange-500',
                            borderColor: 'border-orange-500',
                        },
                        {
                            name: 'person',
                            icon: '/person.png',
                            color: 'text-pink-500',
                            borderColor: 'border-pink-500',
                        },
                    ].map((item, index) => (
                        <div
                            key={item.name}
                            ref={(el) => {
                                orbitalRingsRef.current[index] = el;
                            }}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] md:w-[140px] md:h-[140px] opacity-0 ${item.color}`}
                        >
                            <div
                                ref={(el) => {
                                    ringIconsRef.current[index] = el;
                                }}
                                className={`absolute w-[35px] h-[35px] md:w-[50px] md:h-[50px] top-0 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-[#121212] border shadow-lg ${item.borderColor} origin-[center_55px] md:origin-[center_70px]`}
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="w-[55%] h-[55%] object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explosion Overlay */}
                <div
                    ref={explosionOverlayRef}
                    className="fixed inset-0 z-[9998] opacity-0 scale-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(circle at center, rgb(168, 85, 247), rgb(236, 72, 153), rgb(34, 211, 238))',
                    }}
                ></div>

                {/* Counter */}
                <div className="loader-counter fixed bottom-[35%] left-1/2 -translate-x-1/2 z-[9999] flex items-baseline font-bold text-lg md:text-xl tracking-widest text-gray-300 opacity-0">
                    <span
                        ref={counterRef}
                        className="counter-text tabular-nums min-w-[2.5ch] text-right"
                    >
                        0
                    </span>
                    <span className="text-sm opacity-60 ml-0.5">%</span>
                </div>

                {/* Progress Bar */}
                <div className="loader-progress fixed bottom-0 left-0 right-0 h-[2px] bg-white/5 z-[9999] overflow-hidden">
                    <div
                        ref={progressBarRef}
                        className="h-full w-0 animate-shimmer"
                        style={{
                            background:
                                'linear-gradient(90deg, rgb(168, 85, 247), rgb(236, 72, 153), rgb(34, 211, 238))',
                            backgroundSize: '200% 100%',
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default Loader;
