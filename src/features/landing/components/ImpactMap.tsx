import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Quote, Star } from 'lucide-react';

interface Location {
    id: string;
    name: string;
    x: string;
    y: string;
    testimonial: string;
    author: string;
    rating: number;
    userImage: string;
}

const locations: Location[] = [
    {
        id: 'cordoba',
        name: 'Córdoba',
        x: '40%',
        y: '55%',
        testimonial: 'SMARTUR me llevó a rincones cafetaleros que nunca hubiera encontrado por mi cuenta. Una experiencia autética.',
        author: 'María Pérez',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=maria',
    },
    {
        id: 'orizaba',
        name: 'Orizaba',
        x: '30%',
        y: '40%',
        testimonial: 'El algoritmo entendió perfectamente que buscaba aventura y me sugirió la ruta ideal hacia el Pico.',
        author: 'Carlos Ruiz',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=carlos',
    },
    {
        id: 'xalapa',
        name: 'Xalapa',
        x: '55%',
        y: '25%',
        testimonial: 'La mejor ruta cultural. Me encantó cómo la app promueve negocios locales.',
        author: 'Ana Gómez',
        rating: 4,
        userImage: 'https://i.pravatar.cc/150?u=ana',
    },
    {
        id: 'coatepec',
        name: 'Coatepec',
        x: '60%',
        y: '35%',
        testimonial: 'Magia pura. Encontramos fincas hermosas gracias a la recomendación inteligente.',
        author: 'Luis Fernando',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=luis',
    },
    {
        id: 'huatusco',
        name: 'Huatusco',
        x: '48%',
        y: '42%',
        testimonial: 'Increíble gastronomía y trato local. ¡La app no se equivocó!',
        author: 'Elena M.',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=elena',
    },
];

export const ImpactMap: React.FC = () => {
    const [activeLoc, setActiveLoc] = useState<Location>(locations[0]);

    return (
        <section className="relative overflow-hidden bg-slate-950 py-20 transition-colors duration-300 sm:py-32">
            {/* Topographic Background pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M0 60 Q 30 20, 60 60 T 100 60' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M0 40 Q 20 30, 40 40 T 100 40' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '300px 300px',
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="mb-6 text-4xl leading-tight font-black text-white sm:text-5xl">
                        Descubre las <span className="text-[#a3d14f]">Altas Montañas</span>
                    </h2>
                    <p className="text-lg text-slate-300">Nuestros usuarios ya están explorando la región. Selecciona un punto interactivo para conocer sus experiencias.</p>
                </div>

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* Map Area */}
                    <div className="relative aspect-square w-full rounded-[40px] border border-slate-800 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl md:aspect-[4/3] lg:aspect-square">
                        {locations.map((loc) => {
                            const isActive = activeLoc.id === loc.id;
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveLoc(loc)}
                                    className={`absolute -mt-6 -ml-6 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${isActive ? 'z-20 scale-125' : 'z-10 scale-100 hover:scale-110'}`}
                                    style={{ left: loc.x, top: loc.y }}
                                    aria-label={`Ver testimonio en ${loc.name}`}
                                >
                                    <div className={`absolute inset-0 animate-ping rounded-full opacity-75 ${isActive ? 'bg-[#ff4d8d]' : 'bg-[#a3d14f]'}`} />
                                    <div className={`relative flex h-full w-full items-center justify-center rounded-full shadow-xl transition-colors ${isActive ? 'bg-[#ff4d8d]' : 'bg-slate-800'}`}>
                                        <MapPin className={`h-6 w-6 ${isActive ? 'text-white' : 'text-[#a3d14f]'}`} />
                                    </div>

                                    {/* Name Label */}
                                    <span
                                        className={`absolute top-full mt-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 text-sm font-bold whitespace-nowrap text-[#a3d14f] backdrop-blur-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        {loc.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Testimonial Card */}
                    <div className="flex justify-center lg:justify-start lg:pl-10">
                        <div className="relative w-full max-w-md">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeLoc.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl sm:p-10"
                                >
                                    <Quote className="mb-6 h-10 w-10 text-slate-800" />

                                    <div className="mb-6 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-5 w-5 ${i < activeLoc.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                                        ))}
                                    </div>

                                    <p className="mb-8 text-xl leading-relaxed font-medium text-slate-200 sm:text-2xl">"{activeLoc.testimonial}"</p>

                                    <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                                        <img src={activeLoc.userImage} alt={activeLoc.author} className="h-14 w-14 rounded-full object-cover shadow-inner" />
                                        <div>
                                            <h4 className="text-lg font-bold text-white">{activeLoc.author}</h4>
                                            <p className="text-sm font-semibold tracking-wider text-[#a3d14f] uppercase">Experiencia en {activeLoc.name}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Decorative blobs behind the card */}
                            <div className="absolute -top-10 -right-10 h-40 w-40 animate-pulse rounded-full bg-[#ff4d8d] opacity-30 mix-blend-multiply blur-[60px] filter" />
                            <div className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse rounded-full bg-[#914ef5] opacity-30 mix-blend-multiply blur-[60px] filter" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
