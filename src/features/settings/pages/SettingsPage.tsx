import { Settings, Globe, Palette, Shield, Bell, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const UPCOMING = [
    { icon: Globe,   label: 'Idioma',          desc: 'Cambia el idioma de la interfaz entre Español e Inglés.',        solidColor: '#4DB9CA' },
    { icon: Palette, label: 'Apariencia',       desc: 'Personaliza colores de acento y modo claro / oscuro.',           solidColor: '#984EFD' },
    { icon: Shield,  label: 'Seguridad',        desc: 'Autenticación de dos factores y gestión de sesiones.',           solidColor: '#10B981' },
    { icon: Bell,    label: 'Notificaciones',   desc: 'Configura alertas de evaluaciones y reportes.',                  solidColor: '#F59E0B' },
];

export const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: 'var(--color-purple)' }}>
                    <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Configuración
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                        Preferencias del sistema y la cuenta
                    </p>
                </div>
            </div>

            {/* Active setting: theme */}
            <div className="rounded-2xl border p-6 shadow-sm" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{ background: 'var(--color-purple)' }}>
                            <Palette className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Modo de apariencia</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>
                                Actualmente: <span className="font-medium">{theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                        style={{ background: 'var(--color-purple)' }}
                    >
                        Cambiar a {theme === 'dark' ? 'Claro' : 'Oscuro'}
                    </button>
                </div>
            </div>

            {/* Coming soon */}
            <div>
                <div className="mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" style={{ color: 'var(--color-text-alt)' }} />
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-alt)' }}>
                        Próximamente
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {UPCOMING.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="relative overflow-hidden rounded-2xl border p-5"
                            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                                    style={{ background: item.solidColor }}>
                                    <item.icon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>{item.desc}</p>
                                </div>
                            </div>
                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
                                style={{ background: 'var(--color-bg-alt)' }}>
                                <Sparkles className="h-3 w-3" style={{ color: 'var(--color-purple)' }} />
                                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-alt)' }}>
                                    En desarrollo
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
