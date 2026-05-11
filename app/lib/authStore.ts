'use client';

export type User = {
  id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
};

const STORAGE_KEY = 'turbotech.auth.v1';
const USERS_KEY = 'turbotech.users.v1';

export function getUsers(): Array<{ phone: string; email: string; password: string; firstName: string; lastName: string }> {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users: Array<{ phone: string; email: string; password: string; firstName: string; lastName: string }>) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function readAuth(): User | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.id !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAuth(user: User | null) {
  try {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    window.dispatchEvent(new Event('auth:changed'));
  } catch {
    // ignore
  }
}

export function login(phoneOrEmail: string, password: string): User | null {
  const users = getUsers();
  const normalizedInput = phoneOrEmail.trim().toLowerCase();
  
  const user = users.find(
    (u) => (u.phone === normalizedInput || u.email.toLowerCase() === normalizedInput) && u.password === password
  );
  
  if (!user) return null;
  
  const authUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    phone: user.phone,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    registeredAt: new Date().toISOString(),
  };
  
  writeAuth(authUser);
  return authUser;
}

export function register(data: {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): { success: boolean; error?: string } {
  const users = getUsers();
  const normalizedPhone = data.phone.trim();
  const normalizedEmail = data.email.trim().toLowerCase();
  
  // Check if user already exists
  if (users.some((u) => u.phone === normalizedPhone)) {
    return { success: false, error: 'Энэ утасны дугаар бүртгэгдсэн байна' };
  }
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'Энэ и-мэйл хаяг бүртгэгдсэн байна' };
  }
  
  // Add new user
  users.push({
    phone: normalizedPhone,
    email: normalizedEmail,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  });
  saveUsers(users);
  
  // Auto login after registration
  const authUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    phone: normalizedPhone,
    email: normalizedEmail,
    firstName: data.firstName,
    lastName: data.lastName,
    registeredAt: new Date().toISOString(),
  };
  
  writeAuth(authUser);
  return { success: true };
}

export function logout() {
  writeAuth(null);
}

export function isLoggedIn(): boolean {
  return readAuth() !== null;
}
