import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    title: "Básico",
    description: "Ideal para pequeños negocios locales que inician su digitalización.",
    price: { monthly: 299, annual: 249 },
    features: [
      { title: "Perfil en la plataforma", available: true },
      { title: "QR de recomendación", available: true },
      { title: "Soporte vía email", available: true },
      { title: "IA avanzada", available: false },
      { title: "Estadísticas en vivo", available: false },
    ]
  },
  {
    title: "Pro",
    description: "Para negocios que buscan maximizar su visibilidad y ventas.",
    price: { monthly: 599, annual: 499 },
    featured: true,
    features: [
      { title: "Todo lo del Básico", available: true },
      { title: "IA de recomendación prioritaria", available: true },
      { title: "Panel de analíticas", available: true },
      { title: "Soporte 24/7", available: true },
      { title: "Promociones destacadas", available: true },
    ]
  },
  {
    title: "Premium",
    description: "Gestión completa y analítica profunda para grandes establecimientos.",
    price: { monthly: 999, annual: 849 },
    features: [
      { title: "Todo lo del Pro", available: true },
      { title: "IA predictiva de demanda", available: true },
      { title: "API de integración", available: true },
      { title: "Consultoría mensual", available: true },
      { title: "Márketing conjunto", available: true },
    ]
  }
];

export const PlansNew: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        priceRefs.current.forEach((el, i) => {
            if (!el) return;
            const targetPrice = isAnnual ? PLANS[i].price.annual : PLANS[i].price.monthly;
            const proxy = { val: parseFloat(el.innerText) || 0 };
            
            gsap.to(proxy, {
                val: targetPrice,
                duration: 0.8,
                ease: "power3.out",
                onUpdate: () => {
                    if (el) el.innerText = Math.round(proxy.val).toString();
                }
            });
        });
    }, [isAnnual]);

    return (
        <section id="pricing" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="landing-heading text-4xl md:text-5xl font-black mb-6 text-slate-900">
                        Planes que <span className="text-green-600">Crecen Contigo</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        Elige el nivel de visibilidad e inteligencia que tu negocio necesita.
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex justify-center items-center gap-4 mb-16">
                    <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Mensual</span>
                    <button 
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${isAnnual ? 'bg-green-600' : 'bg-slate-200'}`}
                    >
                        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
                    </button>
                    <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                        Anual <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-[10px] rounded-full">-20%</span>
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan, i) => (
                        <div 
                            key={i}
                            className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col ${plan.featured ? 'border-green-600 bg-green-50/20 shadow-xl scale-105 z-10' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${plan.featured ? 'text-green-700' : 'text-slate-900'}`}>{plan.title}</h3>
                            <p className="text-sm text-slate-500 mb-8 leading-relaxed">{plan.description}</p>
                            
                            <div className="mb-8">
                                <span className="text-2xl font-bold text-slate-900">$</span>
                                <span 
                                    ref={el => { priceRefs.current[i] = el; }}
                                    className="text-5xl font-black text-slate-900 tracking-tighter"
                                >
                                    {plan.price.monthly}
                                </span>
                                <span className="text-slate-400 font-bold ml-1">/{isAnnual ? 'año' : 'mes'}</span>
                            </div>

                            <ul className="mb-10 flex-grow space-y-4">
                                {plan.features.map((feat, fi) => (
                                    <li key={fi} className={`flex items-center gap-3 text-sm ${feat.available ? 'text-slate-700' : 'text-slate-300'}`}>
                                        <Check size={18} className={feat.available ? 'text-green-500' : 'opacity-20'} />
                                        <span className={feat.available ? 'font-medium' : ''}>{feat.title}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                className="btn-premium w-full mt-auto"
                                style={{ 
                                    '--bg-color': plan.featured ? 'var(--color-green)' : 'var(--color-purple)',
                                    '--hover-text': plan.featured ? 'var(--color-green)' : 'var(--color-purple)'
                                } as any}
                            >
                                <span>
                                    <span className="btn-base gap-2 py-4 font-bold">
                                        Empezar Ahora <ArrowRight size={18} />
                                    </span>
                                    <span className="btn-hover gap-2 py-4 font-bold" aria-hidden="true">
                                        Empezar Ahora <ArrowRight size={18} />
                                    </span>
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
