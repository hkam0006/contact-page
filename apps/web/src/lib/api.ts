const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || "Request failed")
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
