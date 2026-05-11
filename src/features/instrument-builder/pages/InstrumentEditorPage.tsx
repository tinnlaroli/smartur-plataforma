import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Plus, Trash2, GripVertical, Save, Eye, EyeOff,
    ToggleLeft, ToggleRight, AlertCircle, Loader2, Check,
    Type, List, Star, CheckSquare, ChevronDown,
} from 'lucide-react';
import { instrumentApi } from '../api/instrumentApi';
import type { FullRubric, Criterion, Subcriterion, FieldType } from '../types/types';
import { useToast } from '../../../shared/context/ToastContext';

const FIELD_TYPES: { value: FieldType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'text', label: 'Texto', icon: Type },
    { value: 'multiple_choice', label: 'Opción múltiple', icon: List },
    { value: 'scale', label: 'Escala / Rating', icon: Star },
    { value: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { value: 'select', label: 'Select', icon: ChevronDown },
];

export const InstrumentEditorPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();

    const [rubric, setRubric] = useState<FullRubric | null>(null);
    const [criteria, setCriteria] = useState<Criterion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);

    const [templateName, setTemplateName] = useState('');
    const [templateVersion, setTemplateVersion] = useState('');
    const [templateServiceType, setTemplateServiceType] = useState('');
    const [templateActive, setTemplateActive] = useState(true);

    const fetchRubric = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const r = await instrumentApi.getRubric(Number(id));
            setRubric(r);
            setTemplateName(r.name);
            setTemplateVersion(r.version);
            setTemplateServiceType(r.service_type);
            setTemplateActive(r.active);
            setCriteria(r.criteria || []);
        } catch {
            try {
                const res = await instrumentApi.getCriteria(Number(id));
                setCriteria(res);
                const tpl = await instrumentApi.getTemplateById(Number(id));
                setTemplateName(tpl.template.name);
                setTemplateVersion(tpl.template.version);
                setTemplateServiceType(tpl.template.servicio);
                setTemplateActive(tpl.template.estado);
            } catch {
                setError('No se pudo cargar el instrumento');
            }
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRubric();
    }, [fetchRubric]);

    const handleSaveTemplate = async () => {
        if (!id) return;
        setSaving(true);
        try {
            await instrumentApi.updateTemplate(Number(id), {
                name: templateName,
                version: templateVersion,
                service_type: templateServiceType,
                active: templateActive,
            });
            toast.success('Instrumento guardado', 'Cambios aplicados correctamente');
        } catch {
            toast.error('Error al guardar', 'No se pudieron guardar los cambios');
        } finally {
            setSaving(false);
        }
    };

    const addCriterion = async () => {
        if (!id) return;
        const tempId = Date.now();
        const newCriterion: Criterion = {
            id_criterion: tempId,
            id_template: Number(id),
            name: '',
            description: '',
            weight: 1,
            order_index: criteria.length,
            active: true,
            field_type: 'scale',
            is_required: true,
            levels: [],
        };
        setCriteria([...criteria, newCriterion]);
    };

    const updateCriterion = (index: number, updates: Partial<Criterion>) => {
        setCriteria(criteria.map((c, i) => (i === index ? { ...c, ...updates } : c)));
    };

    const removeCriterion = async (index: number) => {
        const criterion = criteria[index];
        if (criterion.id_criterion > 0 && !criterion.name.startsWith('temp-')) {
            try {
                await instrumentApi.deleteCriterion(criterion.id_criterion);
            } catch {
                // ignore
            }
        }
        setCriteria(criteria.filter((_, i) => i !== index));
    };

    const moveCriterion = (from: number, to: number) => {
        const next = [...criteria];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        setCriteria(next.map((c, i) => ({ ...c, order_index: i })));
    };

    const addLevel = (criterionIndex: number) => {
        const level: Subcriterion = {
            id_subcriterion: 0,
            id_criterion: 0,
            description: '',
            score: 0,
            order_index: (criteria[criterionIndex].levels?.length || 0),
        };
        updateCriterion(criterionIndex, {
            levels: [...(criteria[criterionIndex].levels || []), level],
        });
    };

    const updateLevel = (criterionIndex: number, levelIndex: number, updates: Partial<Subcriterion>) => {
        const levels = [...(criteria[criterionIndex].levels || [])];
        levels[levelIndex] = { ...levels[levelIndex], ...updates };
        updateCriterion(criterionIndex, { levels });
    };

    const removeLevel = (criterionIndex: number, levelIndex: number) => {
        const levels = criteria[criterionIndex].levels?.filter((_, i) => i !== levelIndex) || [];
        updateCriterion(criterionIndex, { levels });
    };

    const saveAllCriteria = async () => {
        if (!id) return;
        setSaving(true);
        try {
            for (let i = 0; i < criteria.length; i++) {
                const c = criteria[i];
                if (!c.name) continue;

                let criterionId = c.id_criterion;
                if (criterionId > 1000000 || criterionId <= 0) {
                    const created = await instrumentApi.createCriterion({
                        id_template: Number(id),
                        name: c.name,
                        description: c.description,
                        weight: c.weight || 1,
                        order_index: i,
                        active: c.active,
                        field_type: c.field_type || 'scale',
                        is_required: c.is_required,
                    });
                    criterionId = created.id_criterion;
                } else {
                    await instrumentApi.updateCriterion(criterionId, {
                        name: c.name,
                        description: c.description,
                        weight: c.weight || 1,
                        order_index: i,
                        active: c.active,
                        field_type: c.field_type || 'scale',
                        is_required: c.is_required,
                    });
                }

                if (c.levels && c.levels.length > 0 && ['multiple_choice', 'scale', 'checkbox', 'select'].includes(c.field_type)) {
                    await instrumentApi.batchUpdateSubcriteria(
                        criterionId,
                        c.levels.map((l) => ({ description: l.description, score: l.score }))
                    );
                }
            }
            toast.success('Criterios guardados', 'Todas las preguntas se guardaron correctamente');
            fetchRubric();
        } catch {
            toast.error('Error al guardar', 'No se pudieron guardar todos los criterios');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <AlertCircle className="mx-auto h-12 w-12 text-rose-400" />
                    <p className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">{error}</p>
                    <button onClick={fetchRubric} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/dashboard/instrumentos')}
                        className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                            Editor: {templateName || 'Sin nombre'}
                        </h1>
                        <p className="text-sm text-zinc-500">v{templateVersion} · {templateServiceType}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPreview(!preview)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                            preview
                                ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400'
                                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
                        }`}
                    >
                        {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {preview ? 'Editar' : 'Vista previa'}
                    </button>
                </div>
            </div>

            <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-500">Nombre</label>
                        <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            disabled={preview}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-500">Versión</label>
                        <input
                            type="text"
                            value={templateVersion}
                            onChange={(e) => setTemplateVersion(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            disabled={preview}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-500">Tipo Servicio</label>
                        <select
                            value={templateServiceType}
                            onChange={(e) => setTemplateServiceType(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            disabled={preview}
                        >
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurante">Restaurante</option>
                            <option value="Tour">Tour</option>
                            <option value="Spa">Spa</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3 pt-5">
                        <button
                            onClick={() => setTemplateActive(!templateActive)}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                templateActive
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                            disabled={preview}
                        >
                            {templateActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                            {templateActive ? 'Activo' : 'Inactivo'}
                        </button>
                        <button
                            onClick={handleSaveTemplate}
                            disabled={saving || preview}
                            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

            {preview ? (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Vista previa</h2>
                    {criteria.filter((c) => c.active).length === 0 ? (
                        <p className="py-8 text-center text-sm text-zinc-500">Sin preguntas activas</p>
                    ) : (
                        criteria.filter((c) => c.active).map((c, i) => (
                            <div key={c.id_criterion} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                        {i + 1}. {c.name}
                                    </span>
                                    {c.is_required && <span className="text-rose-500">*</span>}
                                </div>
                                {c.description && (
                                    <p className="mb-3 text-sm text-zinc-500">{c.description}</p>
                                )}
                                {c.field_type === 'text' && (
                                    <input
                                        type="text"
                                        placeholder="Respuesta de texto..."
                                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                                        disabled
                                    />
                                )}
                                {c.field_type === 'scale' && (
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <button
                                                key={n}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-sm dark:border-zinc-700"
                                                disabled
                                            >
                                                {n}
                                            </button>
                                        ))}
                                        <span className="ml-2 text-xs text-zinc-400">1=Malo, 5=Excelente</span>
                                    </div>
                                )}
                                {c.field_type === 'multiple_choice' && (
                                    <div className="space-y-2">
                                        {(c.levels || []).map((l, li) => (
                                            <label key={li} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                                <input type="radio" name={`preview-${c.id_criterion}`} disabled className="text-indigo-600" />
                                                {l.description} {l.score > 0 && <span className="text-xs text-zinc-400">({l.score} pts)</span>}
                                            </label>
                                        ))}
                                        {(c.levels || []).length === 0 && (
                                            <p className="text-xs text-zinc-400">Sin opciones configuradas</p>
                                        )}
                                    </div>
                                )}
                                {c.field_type === 'checkbox' && (
                                    <div className="space-y-2">
                                        {(c.levels || []).map((l, li) => (
                                            <label key={li} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                                <input type="checkbox" disabled className="rounded text-indigo-600" />
                                                {l.description} {l.score > 0 && <span className="text-xs text-zinc-400">({l.score} pts)</span>}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {c.field_type === 'select' && (
                                    <select
                                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                                        disabled
                                    >
                                        <option>Seleccionar...</option>
                                        {(c.levels || []).map((l, li) => (
                                            <option key={li}>{l.description}</option>
                                        ))}
                                    </select>
                                )}
                                <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                                    <span>Peso: {c.weight}</span>
                                    <span>·</span>
                                    <span>Tipo: {FIELD_TYPES.find((ft) => ft.value === c.field_type)?.label}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Preguntas ({criteria.length})
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={addCriterion}
                                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Plus className="h-4 w-4" />
                                Agregar Pregunta
                            </button>
                            <button
                                onClick={saveAllCriteria}
                                disabled={saving}
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Check className="h-4 w-4" />
                                )}
                                Guardar Todo
                            </button>
                        </div>
                    </div>

                    {criteria.length === 0 ? (
                        <div className="flex min-h-[30vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <Plus className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                            <p className="text-zinc-500 dark:text-zinc-400">
                                No hay preguntas. Haz clic en "Agregar Pregunta"
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {criteria.map((c, i) => (
                                <div
                                    key={c.id_criterion}
                                    className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="cursor-grab text-zinc-300 hover:text-zinc-500 dark:text-zinc-600">
                                            <GripVertical className="h-5 w-5" />
                                        </div>
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-sm">
                                            {i + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={c.name}
                                            onChange={(e) => updateCriterion(i, { name: e.target.value })}
                                            placeholder="Escribe la pregunta..."
                                            className="flex-1 border-0 border-b-2 border-transparent bg-transparent py-1 text-base font-medium text-zinc-900 placeholder:text-zinc-300 focus:border-indigo-500 focus:ring-0 dark:text-white dark:placeholder:text-zinc-600"
                                        />
                                        <button
                                            onClick={() => updateCriterion(i, { active: !c.active })}
                                            className={`rounded-lg p-1.5 transition-colors ${
                                                c.active
                                                    ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                                                    : 'text-zinc-300 hover:bg-zinc-100 dark:text-zinc-600 dark:hover:bg-zinc-800'
                                            }`}
                                        >
                                            {c.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                                        </button>
                                        <button
                                            onClick={() => removeCriterion(i)}
                                            className="rounded-lg p-1.5 text-rose-400 opacity-0 transition-all hover:bg-rose-50 group-hover:opacity-100 dark:hover:bg-rose-950/30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="ml-10 space-y-4">
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-zinc-500">Tipo de campo</label>
                                                <select
                                                    value={c.field_type}
                                                    onChange={(e) => updateCriterion(i, { field_type: e.target.value as FieldType })}
                                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                                >
                                                    {FIELD_TYPES.map((ft) => (
                                                        <option key={ft.value} value={ft.value}>{ft.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-xs font-medium text-zinc-500">Peso</label>
                                                <input
                                                    type="number"
                                                    value={c.weight}
                                                    onChange={(e) => updateCriterion(i, { weight: Number(e.target.value) })}
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                                />
                                            </div>
                                            <div className="flex items-end gap-2 pb-1">
                                                <input
                                                    type="checkbox"
                                                    id={`required-${i}`}
                                                    checked={c.is_required}
                                                    onChange={(e) => updateCriterion(i, { is_required: e.target.checked })}
                                                    className="rounded border-zinc-300 text-indigo-600 dark:border-zinc-600"
                                                />
                                                <label htmlFor={`required-${i}`} className="text-sm text-zinc-600 dark:text-zinc-400">
                                                    Campo requerido
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-zinc-500">Descripción (opcional)</label>
                                            <input
                                                type="text"
                                                value={c.description || ''}
                                                onChange={(e) => updateCriterion(i, { description: e.target.value })}
                                                placeholder="Instrucciones o ayuda para esta pregunta"
                                                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
                                            />
                                        </div>

                                        {['multiple_choice', 'scale', 'checkbox', 'select'].includes(c.field_type) && (
                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <label className="text-xs font-medium text-zinc-500">Opciones / Niveles</label>
                                                    <button
                                                        onClick={() => addLevel(i)}
                                                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        Agregar opción
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {(c.levels || []).map((l, li) => (
                                                        <div key={li} className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={l.description}
                                                                onChange={(e) => updateLevel(i, li, { description: e.target.value })}
                                                                placeholder="Descripción"
                                                                className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={l.score}
                                                                onChange={(e) => updateLevel(i, li, { score: Number(e.target.value) })}
                                                                placeholder="Pts"
                                                                min="0"
                                                                max="100"
                                                                className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                                            />
                                                            <button
                                                                onClick={() => removeLevel(i, li)}
                                                                className="text-rose-400 hover:text-rose-600"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
