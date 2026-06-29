import { supabase } from "./supabase";

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
  status: 'pending' | 'active' | 'blocked'
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: string
  iban: string
  bic: string
}

// Map DB snake_case → app camelCase
function fromDb(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    birthDate: row.birth_date as string,
    nationality: row.nationality as string,
    idNumber: row.id_number as string,
    address: row.address as string,
    postalBox: row.postal_box as string | undefined,
    city: row.city as string,
    postalCode: row.postal_code as string,
    country: row.country as string,
    phone: row.phone as string,
    email: row.email as string,
    password: row.password as string,
    accountType: row.account_type as User['accountType'],
    balance: Number(row.balance),
    currency: row.currency as string,
    status: row.status as User['status'],
    kycStatus: row.kyc_status as User['kycStatus'],
    createdAt: row.created_at as string,
    iban: row.iban as string,
    bic: row.bic as string,
  }
}

function toDb(user: Partial<User>): Record<string, unknown> {
  const map: Record<string, string> = {
    firstName: 'first_name', lastName: 'last_name', birthDate: 'birth_date',
    idNumber: 'id_number', postalBox: 'postal_box', postalCode: 'postal_code',
    accountType: 'account_type', kycStatus: 'kyc_status', createdAt: 'created_at',
  }
  const result: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(user)) {
    result[map[k] ?? k] = v
  }
  return result
}

export function generateIban(userId: string): string {
  const digits = userId.replace(/[^0-9]/g, '').padEnd(11, '1').slice(0, 11)
  return `FR76 3000 6000 01${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}76`
}

export const BIC = 'NELLOFR21XXX'

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  if (error) { console.error(error); return [] }
  return (data ?? []).map(fromDb)
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error || !data) return null
  return fromDb(data)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').ilike('email', email).single()
  if (error || !data) return null
  return fromDb(data)
}

export async function createUser(user: User): Promise<void> {
  const { error } = await supabase.from('users').insert([toDb(user)])
  if (error) throw error
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
  const { error } = await supabase.from('users').update(toDb(data)).eq('id', id)
  if (error) throw error
}

// Session stored in localStorage (client-only)
const isBrowser = () => typeof window !== 'undefined'

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
