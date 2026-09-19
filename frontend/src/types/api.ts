export interface HelloResponse {
  message: string;
  status: number;
  timestamp: string;
  environment: string;
  correlationId?: string;
}

export interface GreetingRequest {
  name: string;
  language?: string;
}

export interface MemoryUsage {
  usedMb: number;
  freeMb: number;
  totalMb: number;
  maxMb: number;
  availableProcessors: number;
}

export interface SystemInfoResponse {
  application: string;
  version: string;
  status: string;
  javaVersion: string;
  springBootVersion: string;
  uptimeSeconds: number;
  memoryUsage: MemoryUsage;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  validationErrors?: string[];
}

export interface ApiExecutionResult<T = unknown> {
  data: T | null;
  rawText: string;
  status: number;
  statusText: string;
  isOk: boolean;
  durationMs: number;
  correlationId?: string;
  isJson: boolean;
}
