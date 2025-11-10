import { z } from "zod";

const DEFAULT_TIMEOUT = 12_000;

export class ApiError<T = unknown> extends Error {
  public status?: number;
  public data?: T;
  public url?: string;

  constructor(message: string, options?: { status?: number; data?: T; url?: string }) {
    super(message);
    this.name = "ApiError";
    this.status = options?.status;
    this.data = options?.data;
    this.url = options?.url;
  }
}

export type CreateFetchConfig = {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: HeadersInit;
};

export type FetchOptions<TResponse> = Omit<RequestInit, "body"> & {
  /** Optional timeout per request (ms). */
  timeout?: number;
  /** Optional Zod schema to validate the response payload. */
  schema?: z.ZodSchema<TResponse>;
  /** A plain object will be stringified as JSON automatically. */
  body?: BodyInit | Record<string, unknown> | null;
};

export type TypedFetch = <TResponse = unknown>(
  input: string | URL,
  options?: FetchOptions<TResponse>,
) => Promise<TResponse>;

const shouldSerializeBody = (
  body: FetchOptions<unknown>["body"],
): body is Record<string, unknown> => {
  return (
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob)
  );
};

const normalizeURL = (baseURL: string, input: string | URL) => {
  if (input instanceof URL) return input;
  if (baseURL) {
    return new URL(input, baseURL);
  }

  const fallback = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  return new URL(input, fallback);
};

const parseJSON = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  return text as T;
};

export const createFetch = (config: CreateFetchConfig = {}): TypedFetch => {
  const baseURL = config.baseURL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const defaultTimeout = config.timeout ?? DEFAULT_TIMEOUT;

  return async function fetcher<TResponse = unknown>(
    input: string | URL,
    { timeout, schema, body, headers, signal, ...rest }: FetchOptions<TResponse> = {},
  ): Promise<TResponse> {
    const controller = new AbortController();
    const abort = () => controller.abort();
    const timeoutId = setTimeout(abort, timeout ?? defaultTimeout);

    if (signal) {
      if (signal.aborted) {
        controller.abort(signal.reason);
      } else {
        signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
      }
    }

    const url = normalizeURL(baseURL, input);
    const initHeaders = new Headers({
      Accept: "application/json",
      ...(config.defaultHeaders ?? {}),
      ...(headers ?? {}),
    });

    let normalizedBody: BodyInit | undefined;
    if (body !== undefined && body !== null) {
      if (shouldSerializeBody(body)) {
        initHeaders.set("Content-Type", initHeaders.get("Content-Type") ?? "application/json");
        normalizedBody = JSON.stringify(body);
      } else {
        normalizedBody = body as BodyInit;
      }
    }

    try {
      const response = await fetch(url, {
        ...rest,
        headers: initHeaders,
        body: normalizedBody,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const payload = await parseJSON<TResponse | { message?: string }>(response);

      if (!response.ok) {
        throw new ApiError(
          (payload as { message?: string })?.message ?? response.statusText,
          {
            status: response.status,
            data: payload,
            url: url.toString(),
          },
        );
      }

      if (schema) {
        return schema.parse(payload);
      }

      return payload as TResponse;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timed out", { url: url.toString() });
      }
      throw error;
    }
  };
};

export const apiFetch = createFetch();
