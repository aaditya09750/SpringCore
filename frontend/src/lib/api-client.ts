import { ApiExecutionResult } from '@/types/api';

export async function executeApiRequest<T = unknown>(
  method: string,
  path: string,
  payload?: string
): Promise<ApiExecutionResult<T>> {
  const startTime = performance.now();

  const options: RequestInit = {
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  if ((method === 'POST' || method === 'PUT') && payload?.trim()) {
    (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
    options.body = payload.trim();
  }

  try {
    const response = await fetch(path, options);
    const durationMs = Math.round(performance.now() - startTime);
    const correlationId = response.headers.get('X-Correlation-ID') || undefined;
    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();
    let data: T | null = null;
    let formattedText = rawText;
    let isJson = false;

    try {
      data = JSON.parse(rawText) as T;
      formattedText = JSON.stringify(data, null, 2);
      isJson = true;
    } catch (_) {
      formattedText = rawText;
      isJson = false;
    }

    return {
      data,
      rawText: formattedText,
      status: response.status,
      statusText: response.statusText || (response.ok ? 'OK' : 'Error'),
      isOk: response.ok,
      durationMs,
      correlationId,
      isJson,
    };
  } catch (error: unknown) {
    const durationMs = Math.round(performance.now() - startTime);
    const message = error instanceof Error ? error.message : 'Network connection failed. Verify Spring Boot is running on port 8080.';

    return {
      data: null,
      rawText: message,
      status: 0,
      statusText: 'Connection Error',
      isOk: false,
      durationMs,
      isJson: false,
    };
  }
}
