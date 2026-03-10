import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrainCircuit, Map, Leaf, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SmartEngine: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate title
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                },
            );

            // Animate steps
            stepsRef.current.forEach((step, index) => {
                if (!step) return;
                gsap.fromTo(
                    step,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                        },
                        delay: index * 0.2, // Stagger effect
                    },
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            id: 'input',
            title: '1. Tu Perfil',
            desc: 'Analizamos tus preferencias: aventura, relax, cultura o naturaleza.',
            icon: <Compass className="h-8 w-8 text-[#914ef5]" />,
            bgColor: 'bg-[#914ef5]/10',
            borderColor: 'border-[#914ef5]/30',
        },
        {
            id: 'processing',
            title: '2. Motor Inteligente',
            desc: 'El algoritmo cruza miles de datos hiperlocales en tiempo real.',
            icon: <BrainCircuit className="h-8 w-8 text-[#ff4d8d]" />,
            bgColor: 'bg-[#ff4d8d]/10',
            borderColor: 'border-[#ff4d8d]/30',
        },
        {
            id: 'sustainability',
            title: '3. Filtro Verde',
            desc: 'Priorizamos experiencias con impacto positivo en la comunidad.',
            icon: <Leaf className="h-8 w-8 text-[#a3d14f]" />,
            bgColor: 'bg-[#a3d14f]/10',
            borderColor: 'border-[#a3d14f]/30',
        },
        {
            id: 'output',
            title: '4. Ruta Perfecta',
            desc: 'Obtienes un itinerario único, listo para vivirse al máximo.',
            icon: <Map className="h-8 w-8 text-[#ff7d1f]" />,
            bgColor: 'bg-[#ff7d1f]/10',
            borderColor: 'border-[#ff7d1f]/30',
        },
    ];

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 sm:py-32">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <div ref={titleRef} className="mb-16 text-center md:mb-24">
                    <p className="mb-3 text-sm font-bold tracking-widest text-[#914ef5] uppercase">Smart Routes</p>
                    <h2 className="mb-6 text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
                        Así funciona la
                        <span className="bg-gradient-to-r from-[#914ef5] to-[#ff4d8d] bg-clip-text text-transparent"> magia</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600">Nuestro Motor Inteligente analiza variables complejas para simplificar tu experiencia de viaje.</p>
                </div>

                <div className="relative">
                    {/* Animated Connecting Line (Desktop) */}
                    <div className="absolute top-[50%] right-[10%] left-[10%] -z-10 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#914ef5] via-[#ff4d8d] to-[#ff7d1f] opacity-20 lg:block" />

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={(el) => {
                                    stepsRef.current[index] = el;
                                }}
                                className="group relative flex flex-col items-center text-center"
                            >
                                <div
                                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 sm:h-24 sm:w-24 ${step.borderColor} ${step.bgColor} bg-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-xl`}
                                >
                                    {step.icon}
                                </div>

                                <h3 className="mb-3 text-2xl font-black text-slate-900">{step.title}</h3>

                                <p className="px-4 leading-relaxed text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decorative Blobs */}
            <div className="pointer-events-none absolute top-1/4 left-10 h-64 w-64 rounded-full bg-[#914ef5] opacity-10 mix-blend-multiply blur-[100px] filter" />
            <div className="pointer-events-none absolute right-10 bottom-1/4 h-64 w-64 rounded-full bg-[#ff4d8d] opacity-10 mix-blend-multiply blur-[100px] filter" />
        </section>
    );
};
