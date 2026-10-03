export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    let message = 'An error occurred';
    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch {
      // Ignored
    }
    throw new Error(message);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return null as any;
}

export const api = {
  get: <T>(url: string) => apiFetch<T>(url, { method: 'GET' }),
  
  post: <T>(url: string, data?: any) => {
    const isFormData = data instanceof FormData;
    return apiFetch<T>(url, {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    });
  },
  
  put: <T>(url: string, data?: any) => {
    const isFormData = data instanceof FormData;
    return apiFetch<T>(url, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
    });
  },
  
  delete: <T>(url: string) => apiFetch<T>(url, { method: 'DELETE' }),
};
