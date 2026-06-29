export type User = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  nationality: string
  idNumber: string
  address: string
  postalBox?: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  password: string
  accountType: 'personnel' | 'courant' | 'premium' | 'epargne'
  balance: number
  currency: string
  status: 'blocked' | 'active'
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: string
  iban: string
  bic: string
}

export function generateIban(userId: string): string {
  const digits = userId.replace(/[^0-9]/g, '').padEnd(11, '1').slice(0, 11)
  return `FR76 3000 6000 01${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}76`
}

export const BIC = 'NELLOFR21XXX'

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
