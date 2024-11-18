"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithEmail, loginWithPhone } from "@/lib/auth";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { AuthInput } from "@/components/auth/auth-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await loginWithEmail(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await loginWithPhone(phone, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <FloatingOrbs />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-purple-500">
            <Calendar size={32} className="animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              BookME
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-white">Sign In.</h2>
        </div>

        <div className="bg-neutral-800/30 backdrop-blur-sm p-6 rounded-3xl border border-neutral-700/50 shadow-xl">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-8 rounded-2xl bg-neutral-800/50 p-1">
              <TabsTrigger value="email" className="rounded-xl">Email</TabsTrigger>
              <TabsTrigger value="phone" className="rounded-xl">Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <AuthInput
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white rounded-2xl px-4 py-3 font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Signing in..." : "Sign In with Email"}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <AuthInput
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white rounded-2xl px-4 py-3 font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Signing in..." : "Sign In with Phone"}
                </button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-2 mt-6">
            <p className="text-neutral-400 text-sm">
              don't have an account?{" "}
              <Link href="/auth/register" className="text-white hover:text-purple-400">
                Create a account
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="text-white hover:text-purple-400 text-sm block"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}