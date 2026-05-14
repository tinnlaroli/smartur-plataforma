import axios from 'axios';

/**
 * Mensaje legible para el usuario a partir de errores de Axios (incluye cuerpo no-JSON).
 */
export function extractAxiosErrorMessage(err: unknown): string {
    if (!axios.isAxiosError(err)) {
        return err instanceof Error ? err.message : 'Error desconocido.';
    }

    const status = err.response?.status;
    const data = err.response?.data;

    if (data && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        const rec = data as Record<string, unknown>;
        const msg = rec.message;
        const errField = rec.error;
        if (typeof msg === 'string' && msg.trim()) return msg.trim();
        if (typeof errField === 'string' && errField.trim()) return errField.trim();
    }

    if (typeof data === 'string' && data.trim()) {
        const trimmed = data.replace(/\s+/g, ' ').trim();
        if (/^<!DOCTYPE|^<html/i.test(trimmed)) {
            return `El servidor respondió HTML en lugar de JSON (HTTP ${status ?? '—'}). Suele indicar 404 o proxy mal configurado: la ruta no existe en el API o no apunta a api-smartur.`;
        }
        return trimmed.length > 200 ? `${trimmed.slice(0, 200)}…` : trimmed;
    }

    if (status === 404) {
        return 'Recurso no encontrado (HTTP 404). Reinicia api-smartur para aplicar la ruta GET /templates/:id/rubric, o revisa que VITE_API_URL sea http://localhost:PUERTO/api/v2.';
    }
    if (status === 401) {
        return 'No autorizado (HTTP 401). Inicia sesión de nuevo; el token puede haber expirado.';
    }
    if (status) {
        const st = err.response?.statusText;
        return `Error HTTP ${status}${st ? ` (${st})` : ''}.`;
    }

    if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        return 'Sin respuesta del servidor (red o CORS). Comprueba que el API esté en marcha y que VITE_API_URL incluya /api/v2 (p. ej. http://localhost:4000/api/v2).';
    }

    return err.message?.trim() || 'No se pudo completar la petición al API.';
}
