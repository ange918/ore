export type User = {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  accountType: 'personnel' | 'courant' | 'premium'
  balance: number
  currency: string
  status: 'blocked' | 'active'
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: string
}

// SSR-safe localStorage access
const isBrowser = () => typeof window !== 'undefined'

export function getUsers(): User[] {
  if (!isBrowser()) return []
  try {
    const data = localStorage.getItem('nelloa_users')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function saveUsers(users: User[]): void {
  if (!isBrowser()) return
  localStorage.setItem('nelloa_users', JSON.stringify(users))
}

export function getUserById(id: string): User | null {
  return getUsers().find(u => u.id === id) || null
}

export function getUserByEmail(email: string): User | null {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function updateUser(id: string, data: Partial<User>): void {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === id)
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data }
    saveUsers(users)
  }
}

export function getSession(): string | null {
  if (!isBrowser()) return null
  return localStorage.getItem('nelloa_session')
}

export function setSession(id: string): void {
  if (!isBrowser()) return
  localStorage.setItem('nelloa_session', id)
}

export function clearSession(): void {
  if (!isBrowser()) return
  localStorage.removeItem('nelloa_session')
}
