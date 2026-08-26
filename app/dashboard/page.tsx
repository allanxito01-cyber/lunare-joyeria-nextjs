"use client"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [perfil, setPerfil] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        async function getData() {
            // 1. Verificamos quién inició sesión
            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                router.push('/login')
                return
            }
            setUser(session.user)

            // 2. Buscamos su nombre y rol en la tabla profiles
            const { data: perfilData } = await supabase
                .from('profiles')
                .select('full_name, role')
                .eq('id', session.user.id)
                .single()
            
            if (perfilData) {
                setPerfil(perfilData)
            }
        }
        getData()
    }, [router])

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-400">Cargando tu información...</p>
            </div>
        )
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            ¡Hola, {perfil ? perfil.full_name : 'Usuario'}!
                        </h1>
                        <p className="text-slate-400">
                            Bienvenido a la gestión interna de Lunare JOYERÍA.
                        </p>
                    </div>
                    {/* Etiqueta visual para el rol */}
                    {perfil && (
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            perfil.role === 'admin' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        }`}>
                            {perfil.role === 'admin' ? 'Administrador' : 'Cliente'}
                        </span>
                    )}
                </div>
                
                <div className="bg-slate-900 rounded-lg p-6 mb-8 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-2">Tus datos de acceso:</h2>
                    <p className="text-slate-300 mb-1">
                        <span className="font-bold">Correo:</span> {user.email}
                    </p>
                    <p className="text-slate-300">
                        <span className="font-bold">Rol en el sistema:</span> {perfil ? perfil.role : 'Cargando...'}
                    </p>
                </div>

                <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    Cerrar sesión
                </button>
            </div>
        </main>
    )
}