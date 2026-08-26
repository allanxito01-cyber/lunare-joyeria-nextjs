"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    // Conectamos con Supabase
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        // Revisamos si alguien ya inició sesión al cargar la página
        async function getUser() {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        }
        getUser();
        
        // Esto hace que la barra se actualice al instante si inicias o cierras sesión
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push('/');
    }

    return (
        <nav className="border-b border-slate-800 bg-slate-900">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white tracking-widest">
                    LUNARE
                </Link>
                <div className="flex gap-4 items-center">
                    {/* Condición: ¿Hay usuario logueado? */}
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">
                                Mi Panel
                            </Link>
                            <button 
                                onClick={handleSignOut} 
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-slate-300 hover:text-white transition-colors text-sm">
                                Iniciar sesión
                            </Link>
                            <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}