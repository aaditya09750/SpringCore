export interface PresetEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  label: string;
  description: string;
  payload?: string;
}

export const PRESET_ENDPOINTS: PresetEndpoint[] = [
  {
    id: 'hello-get',
    method: 'GET',
    path: '/hello',
    label: '/hello',
    description: 'Initial plain Hello World route',
  },
  {
    id: 'greet-valid',
    method: 'POST',
    path: '/api/greet',
    label: 'POST /api/greet (Valid)',
    description: 'Validated greeting request with Spanish language payload',
    payload: JSON.stringify({ name: 'Developer', language: 'es' }, null, 2),
  },
  {
    id: 'greet-invalid',
    method: 'POST',
    path: '/api/greet',
    label: 'POST /api/greet (Validation Error)',
    description: 'Triggers Jakarta validation error (@NotBlank constraint)',
    payload: JSON.stringify({ name: ' ', language: 'en' }, null, 2),
  },
  {
    id: 'simulate-error',
    method: 'GET',
    path: '/api/simulate-error?type=notfound',
    label: 'GET /api/simulate-error (404)',
    description: 'Demonstrates centralized RFC 7807 Global Exception Handling',
  },
  {
    id: 'actuator-health',
    method: 'GET',
    path: '/actuator/health',
    label: 'GET /actuator/health',
    description: 'Production Spring Boot Actuator liveness and readiness probe',
  },
  {
    id: 'system-info',
    method: 'GET',
    path: '/api/info',
    label: 'GET /api/info',
    description: 'Application and JVM memory telemetry',
  },
];
