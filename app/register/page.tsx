"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('cliente')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null) // Limpia errores anteriores

        const { error } = await supabase.auth.signUp({
            email, 
            password,
            options: { data: { full_name: fullName, role } }
        })

        if (error) {
            setError(error.message)
            return
        }
        
        // Si todo sale bien, te manda al inicio de sesión
        router.push('/login')
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-2">Crear cuenta</h1>
                <p className="text-slate-400 mb-8">Únete a Lunare JOYERÍA</p>
                
                {/* Caja roja de errores (solo aparece si hay error) */}
                {error && (
                    <p className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={fullName} onChange={e => setFullName(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña (mínimo 6 caracteres)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    <select
                        value={role} onChange={e => setRole(e.target.value)}
                        className="bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="cliente">Cliente (Comprador)</option>
                        <option value="admin">Administrador (Dueño)</option>
                    </select>
                    
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
                    >
                        Registrarme
                    </button>
                </form>
                
                <p className="text-slate-400 text-center mt-6 text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </section>
    )
}