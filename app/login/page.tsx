"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null) // Limpia errores de intentos anteriores

        const { error } = await supabase.auth.signInWithPassword({
            email, 
            password
        })

        if (error) {
            setError(error.message)
            return
        }
        
        // Si las credenciales son correctas, te manda al panel de control
        router.push('/dashboard')
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-2">Iniciar sesión</h1>
                <p className="text-slate-400 mb-8">Accede a tu cuenta de Lunare</p>
                
                {/* Caja roja de errores (ej: contraseña incorrecta) */}
                {error && (
                    <p className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                    >
                        Ingresar
                    </button>
                </form>

                <p className="text-slate-400 text-center mt-6 text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                        Regístrate
                    </Link>
                </p>
            </div>
        </section>
    )
}