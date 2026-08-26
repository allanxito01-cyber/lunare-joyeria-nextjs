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
    const router = useRouter()

    useEffect(() => {
        // Función para obtener el usuario que inició sesión
        async function getUser() {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                // Si alguien intenta entrar sin iniciar sesión, lo pateamos al login
                router.push('/login')
            } else {
                setUser(session.user)
            }
        }
        getUser()
    }, [router])

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.push('/') // Te regresa a la página principal del catálogo
    }

    // Pantalla de carga mientras lee la base de datos
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
                <h1 className="text-3xl font-bold text-white mb-2">
                    Panel de Administración
                </h1>
                <p className="text-slate-400 mb-8">
                    Bienvenido a la gestión interna de Lunare JOYERÍA.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-6 mb-8 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-2">Tus datos de acceso:</h2>
                    <p className="text-slate-300">
                        <span className="font-bold">Correo:</span> {user.email}
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