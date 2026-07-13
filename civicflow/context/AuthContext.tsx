"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import { DEMO_USER } from "@/lib/mock-data";

const SESSION_KEY = "civicflow_session";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore corrupted session
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 550));

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail === DEMO_USER.email.toLowerCase() &&
      password === DEMO_USER.password
    ) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      return { ok: true };
    }

    return {
      ok: false,
      error: "That email and password combination doesn't match our records.",
    };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
