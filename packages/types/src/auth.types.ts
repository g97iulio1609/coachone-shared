/**
 * Authentication Types
 *
 * Type definitions per NextAuth e autenticazione
 */

import type { UserRole, SafeUser } from './database.types';

/**
 * Session User
 * Informazioni utente nella sessione
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  credits: number;
  image: string | null;
}

/**
 * Login Credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register Data
 */
export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  referralCode?: string;
  privacyConsent?: boolean;
  termsConsent?: boolean;
}

/**
 * Auth Response
 */
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: SafeUser;
  error?: string;
}

/**
 * Password Reset Request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password Reset Confirmation
 */
export interface PasswordResetConfirmation {
  token: string;
  password: string;
}

/**
 * Change Password
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// Role Utilities - Client-Safe
// Queste utility sono pure e possono essere usate sia client che server
// ============================================================================

export type AppUserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'COACH';

const ROLE_ALIAS_MAP: Record<string, AppUserRole> = {
  USER: 'USER',
  ATHLETE: 'USER', // alias legacy per utenti standard
  ADMIN: 'ADMIN',
  COACH: 'COACH',
  SUPERADMIN: 'SUPER_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

const ROLE_INHERITANCE: Record<AppUserRole, ReadonlyArray<AppUserRole>> = {
  USER: ['USER'],
  COACH: ['COACH', 'USER'],
  ADMIN: ['ADMIN', 'COACH', 'USER'],
  SUPER_ADMIN: ['SUPER_ADMIN', 'ADMIN', 'COACH', 'USER'],
};

export const ADMIN_ROLES: ReadonlyArray<AppUserRole> = ['ADMIN', 'SUPER_ADMIN'];

/**
 * Normalizza qualsiasi input ruolo (enum, stringa, alias) in un valore canonico.
 */
export function normalizeRole(role?: string | null): AppUserRole | null {
  if (!role) return null;
  const sanitized = role.toString().trim().toUpperCase();
  if (!sanitized) return null;
  const key = sanitized.replace(/[^A-Z_]/g, '');
  return ROLE_ALIAS_MAP[key] ?? null;
}

/**
 * Verifica se il ruolo soddisfa quello richiesto, includendo ereditarietà.
 */
export function roleSatisfies(requiredRole: AppUserRole, role?: string | null): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;
  return ROLE_INHERITANCE[normalized].includes(requiredRole);
}

export function isAdminRole(role?: string | null): boolean {
  return roleSatisfies('ADMIN', role);
}

export function isSuperAdminRole(role?: string | null): boolean {
  return normalizeRole(role) === 'SUPER_ADMIN';
}

export function isCoachRole(role?: string | null): boolean {
  return roleSatisfies('COACH', role);
}

export function isUserRole(role?: string | null): boolean {
  return normalizeRole(role) === 'USER';
}

/**
 * Authenticated User - Client-Safe Type
 * Informazioni utente autenticato senza dipendenze server
 */
export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  credits: number;
  image?: string | null;
  copilotEnabled: boolean;
};


