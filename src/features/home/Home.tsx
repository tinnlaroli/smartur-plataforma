import {
    Users,
    Building2,
    MapPin,
    Award,
    TrendingUp,
    Briefcase,
    DollarSign,
    Leaf,
    Star,
    Activity,
    UserCheck,
    UserPlus,
    Hotel,
    Coffee,
    Mountain,
    Globe,
    Clock,
    BarChart3,
    Percent,
    Factory,
    Trees,
} from 'lucide-react';

export const Home = () => {
    const stats = {
        // Usuarios y perfiles
        totalUsers: 1250,
        activeUsers: 980,
        adminUsers: 8,
        touristProfiles: 892,

        // Empresas y servicios
        totalCompanies: 345,
        activeServices: 567,
        certifiedServices: 89,

        // Turismo
        pointsOfInterest: 234,
        totalLocations: 156,
        monthlyExpenditure: 458000,

        // Empleo
        totalEmployees: 1234,
        activeJobPositions: 89,

        // Sostenibilidad
        sustainableCompanies: 78,
        sustainablePOI: 145,
    };

    const recentActivities = [
        {
            id: 1,
            type: 'user',
            action: 'Nuevo usuario registrado',
            user: 'María González',
            time: 'Hace 5 minutos',
        },
        {
            id: 2,
            type: 'company',
            action: 'Empresa verificada',
            user: 'Hotel Paraíso',
            time: 'Hace 15 minutos',
        },
        {
            id: 3,
            type: 'certification',
            action: 'Certificación otorgada',
            user: 'EcoTour',
            time: 'Hace 1 hora',
        },
        {
            id: 4,
            type: 'evaluation',
            action: 'Evaluación completada',
            user: 'Restaurante El Mirador',
            time: 'Hace 2 horas',
        },
    ];

    const topServices = [
        { id: 1, name: 'Hotel Boutique Centro', type: 'hotel', score: 4.8, evaluations: 45 },
        { id: 2, name: 'Restaurante La Playa', type: 'restaurant', score: 4.6, evaluations: 38 },
        { id: 3, name: 'Tour Ecológico Montaña', type: 'tour', score: 4.9, evaluations: 52 },
        { id: 4, name: 'Spa & Wellness Resort', type: 'hotel', score: 4.7, evaluations: 41 },
    ];

    return (
        <div className="min-h-screen bg-zinc-950/10 p-6 text-gray-100">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Usuarios */}
                <div className="rounded-xl border-l-4 border-blue-500 bg-zinc-900 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-400">Usuarios Totales</p>
                            <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                            <p className="mt-2 text-xs text-green-400">↑ 12% este mes</p>
                        </div>
                        <div className="rounded-full bg-zinc-500/20 p-3">
                            <Users className="h-6 w-6 text-blue-400" />
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2 text-sm">
                        <span className="flex items-center gap-1 text-green-400">
                            <UserCheck className="h-4 w-4" /> {stats.activeUsers}
                        </span>
                        <span className="text-gray-600">|</span>
                        <span className="flex items-center gap-1 text-blue-400">
                            <UserPlus className="h-4 w-4" /> {stats.touristProfiles}
                        </span>
                    </div>
                </div>

                {/* Empresas */}
                <div className="rounded-xl border-l-4 border-green-500 bg-zinc-900 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-400">Empresas Registradas</p>
                            <p className="text-2xl font-bold text-white">{stats.totalCompanies}</p>
                            <p className="mt-2 text-xs text-green-400">↑ 8% este mes</p>
                        </div>
                        <div className="rounded-full bg-green-500/20 p-3">
                            <Building2 className="h-6 w-6 text-green-400" />
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2 text-sm">
                        <span className="flex items-center gap-1 text-green-400">
                            <Hotel className="h-4 w-4" /> {stats.activeServices}
                        </span>
                        <span className="text-gray-600">|</span>
                        <span className="flex items-center gap-1 text-yellow-400">
                            <Award className="h-4 w-4" /> {stats.certifiedServices}
                        </span>
                    </div>
                </div>

                {/* Puntos de Interés */}
                <div className="rounded-xl border-l-4 border-purple-500 bg-zinc-900 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-400">Puntos de Interés</p>
                            <p className="text-2xl font-bold text-white">{stats.pointsOfInterest}</p>
                            <p className="mt-2 text-xs text-purple-400">En {stats.totalLocations} ubicaciones</p>
                        </div>
                        <div className="rounded-full bg-purple-500/20 p-3">
                            <MapPin className="h-6 w-6 text-purple-400" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="flex items-center gap-1 text-sm text-purple-400">
                            <Trees className="h-4 w-4" /> Sostenibles: {stats.sustainablePOI}
                        </span>
                    </div>
                </div>

                {/* Sostenibilidad */}
                <div className="rounded-xl border-l-4 border-emerald-500 bg-zinc-900 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-400">Impacto Sostenible</p>
                            <p className="text-2xl font-bold text-white">{stats.sustainableCompanies}</p>
                            <p className="mt-2 text-xs text-emerald-400">Empresas eco-friendly</p>
                        </div>
                        <div className="rounded-full bg-emerald-500/20 p-3">
                            <Leaf className="h-6 w-6 text-emerald-400" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="flex items-center gap-1 text-sm text-emerald-400">
                            <Percent className="h-4 w-4" />
                            {((stats.sustainableCompanies / stats.totalCompanies) * 100).toFixed(1)}% del total
                        </span>
                    </div>
                </div>
            </div>

            {/* Segunda fila de estadísticas */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Gasto Turístico */}
                <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">Gasto Turístico</h3>
                        <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">${stats.monthlyExpenditure.toLocaleString()}</p>
                    <p className="mt-2 text-sm text-gray-400">Gasto mensual estimado</p>
                    <div className="mt-4 h-2 rounded-full bg-gray-700">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '75%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">75% de la capacidad estimada</p>
                </div>

                {/* Empleo Turístico */}
                <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">Empleo en el Sector</h3>
                        <Briefcase className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalEmployees}</p>
                    <p className="mt-2 text-sm text-gray-400">Empleos directos</p>
                    <div className="mt-4 flex justify-between text-sm">
                        <span className="flex items-center gap-1 text-blue-400">
                            <Users className="h-4 w-4" /> Hombres: 45%
                        </span>
                        <span className="flex items-center gap-1 text-pink-400">
                            <Users className="h-4 w-4" /> Mujeres: 55%
                        </span>
                    </div>
                </div>

                {/* Evaluaciones */}
                <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">Evaluaciones</h3>
                        <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">1,234</p>
                    <p className="mt-2 text-sm text-gray-400">Evaluaciones completadas</p>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-sm text-gray-300">Promedio 4.5/5</span>
                    </div>
                </div>
            </div>

            {/* Actividad Reciente y Top Servicios */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Actividad Reciente */}
                <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">Actividad Reciente</h3>
                        <Activity className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 border-b border-gray-700 pb-3 last:border-0">
                                <div
                                    className={`rounded-full p-2 ${
                                        activity.type === 'user'
                                            ? 'bg-zinc-500/20'
                                            : activity.type === 'company'
                                              ? 'bg-green-500/20'
                                              : activity.type === 'certification'
                                                ? 'bg-purple-500/20'
                                                : 'bg-orange-500/20'
                                    }`}
                                >
                                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-400" />}
                                    {activity.type === 'company' && <Building2 className="h-4 w-4 text-green-400" />}
                                    {activity.type === 'certification' && <Award className="h-4 w-4 text-purple-400" />}
                                    {activity.type === 'evaluation' && <Star className="h-4 w-4 text-orange-400" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-200">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.user}</p>
                                </div>
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" /> {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Servicios */}
                <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-200">Servicios Mejor Evaluados</h3>
                        <TrendingUp className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="space-y-4">
                        {topServices.map((service) => (
                            <div key={service.id} className="flex items-center justify-between border-b border-gray-700 pb-3 last:border-0">
                                <div>
                                    <p className="font-medium text-gray-200">{service.name}</p>
                                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                        {service.type === 'hotel' && <Hotel className="h-3 w-3" />}
                                        {service.type === 'restaurant' && <Coffee className="h-3 w-3" />}
                                        {service.type === 'tour' && <Mountain className="h-3 w-3" />}
                                        <span className="capitalize">{service.type}</span> • {service.evaluations} evaluaciones
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-yellow-400">{service.score}</span>
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer con KPIs adicionales */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-zinc-900 p-3 text-center">
                    <Globe className="mx-auto mb-2 h-5 w-5 text-blue-400" />
                    <p className="text-xs text-gray-400">Tipos de Turismo</p>
                    <p className="text-lg font-bold text-white">12</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-3 text-center">
                    <Factory className="mx-auto mb-2 h-5 w-5 text-green-400" />
                    <p className="text-xs text-gray-400">Sectores Turísticos</p>
                    <p className="text-lg font-bold text-white">8</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-3 text-center">
                    <BarChart3 className="mx-auto mb-2 h-5 w-5 text-purple-400" />
                    <p className="text-xs text-gray-400">Plantillas Evaluación</p>
                    <p className="text-lg font-bold text-white">15</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-3 text-center">
                    <Award className="mx-auto mb-2 h-5 w-5 text-yellow-400" />
                    <p className="text-xs text-gray-400">Certificaciones Activas</p>
                    <p className="text-lg font-bold text-white">{stats.certifiedServices}</p>
                </div>
            </div>
        </div>
    );
};
