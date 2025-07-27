// Clerk helper functions
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function getCurrentUser(): Promise<User | null> {
  // Get current authenticated user
  return null;
}

export async function signOut(): Promise<void> {
  // Sign out user
}

export function isAuthenticated(): boolean {
  // Check if user is authenticated
  return false;
}