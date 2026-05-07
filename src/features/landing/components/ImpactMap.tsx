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
        testimonial:
            'SMARTUR me llevó a rincones cafetaleros que nunca hubiera encontrado por mi cuenta. Una experiencia auténtica.',
        author: 'María Pérez',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=maria',
    },
    {
        id: 'orizaba',
        name: 'Orizaba',
        x: '30%',
        y: '40%',
        testimonial:
            'El algoritmo entendió perfectamente que buscaba aventura y me sugirió la ruta ideal hacia el Pico.',
        author: 'Carlos Ruiz',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=carlos',
    },
    {
        id: 'xalapa',
        name: 'Xalapa',
        x: '55%',
        y: '25%',
        testimonial:
            'La mejor ruta cultural. Me encantó cómo la app promueve negocios locales.',
        author: 'Ana Gómez',
        rating: 4,
        userImage: 'https://i.pravatar.cc/150?u=ana',
    },
    {
        id: 'coatepec',
        name: 'Coatepec',
        x: '60%',
        y: '35%',
        testimonial:
            'Magia pura. Encontramos fincas hermosas gracias a la recomendación inteligente.',
        author: 'Luis Fernando',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=luis',
    },
    {
        id: 'huatusco',
        name: 'Huatusco',
        x: '48%',
        y: '42%',
        testimonial:
            'Increíble gastronomía y trato local. ¡La app no se equivocó!',
        author: 'Elena M.',
        rating: 5,
        userImage: 'https://i.pravatar.cc/150?u=elena',
    },
];

export const ImpactMap: React.FC = () => {
    const [activeLoc, setActiveLoc] = useState<Location>(locations[0]);

    return (
        <section
            className="relative overflow-hidden py-20 transition-colors duration-300 sm:py-32"
            style={{
                background:
                    'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)',
            }}
        >
            {/* Background Pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' fill='none' stroke='%23984efd' stroke-width='1'/%3E%3Cpath d='M0 60 Q 30 20, 60 60 T 100 60' fill='none' stroke='%23984efd' stroke-width='1'/%3E%3Cpath d='M0 40 Q 20 30, 40 40 T 100 40' fill='none' stroke='%23984efd' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '300px 300px',
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2
                        className="mb-6 text-4xl leading-tight font-black sm:text-5xl"
                        style={{ color: 'var(--color-text)' }}
                    >
                        Descubre las{' '}
                        <span style={{ color: 'var(--color-purple)' }}>
                            Altas Montañas
                        </span>
                    </h2>

                    <p
                        className="text-lg"
                        style={{ color: 'var(--color-text-alt)' }}
                    >
                        Nuestros usuarios ya están explorando la región.
                        Selecciona un punto interactivo para conocer sus
                        experiencias.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* MAP */}
                    <div
                        className="relative aspect-square w-full rounded-[40px] p-4 shadow-2xl backdrop-blur-xl md:aspect-[4/3] lg:aspect-square"
                        style={{
                            background: 'rgba(var(--rgb-bg), 0.78)',
                            border:
                                '1px solid rgba(var(--rgb-purple-accent), 0.15)',
                        }}
                    >
                        {locations.map((loc) => {
                            const isActive = activeLoc.id === loc.id;

                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveLoc(loc)}
                                    className={`absolute -mt-6 -ml-6 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${isActive
                                            ? 'z-20 scale-125'
                                            : 'z-10 scale-100 hover:scale-110'
                                        }`}
                                    style={{
                                        left: loc.x,
                                        top: loc.y,
                                    }}
                                    aria-label={`Ver testimonio en ${loc.name}`}
                                >
                                    {/* Ping */}
                                    <div
                                        className="absolute inset-0 animate-ping rounded-full opacity-75"
                                        style={{
                                            background: isActive
                                                ? 'var(--color-pink)'
                                                : 'var(--color-purple)',
                                        }}
                                    />

                                    {/* Pin */}
                                    <div
                                        className="relative flex h-full w-full items-center justify-center rounded-full shadow-xl transition-colors"
                                        style={{
                                            background: isActive
                                                ? 'var(--color-pink)'
                                                : 'rgba(var(--rgb-purple-accent), 0.12)',
                                            border:
                                                '1px solid rgba(var(--rgb-purple-accent), 0.15)',
                                        }}
                                    >
                                        <MapPin
                                            className="h-6 w-6"
                                            style={{
                                                color: isActive
                                                    ? '#fff'
                                                    : 'var(--color-purple)',
                                            }}
                                        />
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`absolute top-full mt-2 rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap backdrop-blur-sm transition-opacity ${isActive
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            }`}
                                        style={{
                                            border:
                                                '1px solid rgba(var(--rgb-purple-accent),0.15)',
                                            background:
                                                'rgba(var(--rgb-bg),0.9)',
                                            color: 'var(--color-purple)',
                                        }}
                                    >
                                        {loc.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* TESTIMONIAL */}
                    <div className="flex justify-center lg:justify-start lg:pl-10">
                        <div className="relative w-full max-w-md">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeLoc.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="rounded-3xl p-8 shadow-2xl backdrop-blur-xl sm:p-10"
                                    style={{
                                        background:
                                            'rgba(var(--rgb-bg), 0.88)',
                                        border:
                                            '1px solid rgba(var(--rgb-purple-accent), 0.15)',
                                    }}
                                >
                                    {/* Quote */}
                                    <Quote
                                        className="mb-6 h-10 w-10"
                                        style={{
                                            color: 'var(--color-purple)',
                                        }}
                                    />

                                    {/* Stars */}
                                    <div className="mb-6 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < activeLoc.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p
                                        className="mb-8 text-xl leading-relaxed font-medium sm:text-2xl"
                                        style={{
                                            color: 'var(--color-text)',
                                        }}
                                    >
                                        "{activeLoc.testimonial}"
                                    </p>

                                    {/* Author */}
                                    <div
                                        className="flex items-center gap-4 pt-6"
                                        style={{
                                            borderTop:
                                                '1px solid rgba(var(--rgb-purple-accent), 0.12)',
                                        }}
                                    >
                                        <img
                                            src={activeLoc.userImage}
                                            alt={activeLoc.author}
                                            className="h-14 w-14 rounded-full object-cover shadow-inner"
                                        />

                                        <div>
                                            <h4
                                                className="text-lg font-bold"
                                                style={{
                                                    color:
                                                        'var(--color-text)',
                                                }}
                                            >
                                                {activeLoc.author}
                                            </h4>

                                            <p
                                                className="text-sm font-semibold tracking-wider uppercase"
                                                style={{
                                                    color:
                                                        'var(--color-purple)',
                                                }}
                                            >
                                                Experiencia en {activeLoc.name}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Decorative Blobs */}
                            <div
                                className="absolute -top-10 -right-10 h-40 w-40 animate-pulse rounded-full opacity-20 blur-[70px]"
                                style={{
                                    background: 'var(--color-pink)',
                                }}
                            />

                            <div
                                className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse rounded-full opacity-20 blur-[70px]"
                                style={{
                                    background: 'var(--color-purple)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};