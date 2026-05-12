import React from 'react';
import { MapPin, Star, Share2, Download, ArrowRight, X } from 'lucide-react';
import type { RecommendationsResponse } from '../types/types';

interface RecommendationsResultProps {
    recommendations: RecommendationsResponse['recommendations'];
    onClose: () => void;
}

export const RecommendationsResult: React.FC<RecommendationsResultProps> = ({ recommendations, onClose }) => {
    return (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md duration-300">
            <div className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl duration-300">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-500/20">
                            <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-white">¡Tus Recomendaciones!</h2>
                            <p className="text-sm text-zinc-400">Personalizadas por SMARTUR para ti</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6 overflow-y-auto p-8">
                    {recommendations.slice(0, 5).map((rec, index) => (
                        <div key={rec.item_id || index} className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-indigo-500/50">
                            <div className="absolute top-0 left-0 h-full w-1 rounded-l-full bg-violet-600" />

                            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                                {/* Rank */}
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-2xl font-semibold text-violet-500 shadow-inner transition-transform group-hover:scale-110">
                                    {index + 1}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-violet-400">{rec.title || 'Destino Turístico'}</h3>
                                        <div className="flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2 py-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-yellow-500" />
                                            <span className="text-xs font-semibold">{rec.score.toFixed(3)}</span>
                                        </div>
                                    </div>

                                    <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                        {rec.description || 'Una experiencia única te espera en este increíble destino seleccionado por nuestro algoritmo de IA.'}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 font-semibold tracking-wider text-violet-400 uppercase">
                                            {rec.kind === 'svc' ? 'Servicio Turístico' : 'Punto de Interés'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 bg-zinc-900/50 p-8 sm:flex-row">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95">
                            <Download className="h-5 w-5" />
                            <span>Descargar</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 font-semibold text-violet-400 transition-all hover:bg-zinc-700 active:scale-95">
                            <Share2 className="h-5 w-5" />
                            <span>Compartir</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 rounded-xl bg-violet-600 px-10 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:bg-violet-500 active:scale-95"
                    >
                        <span>Finalizar</span>
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
