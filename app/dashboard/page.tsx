"use client"
import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { crearJoya } from "@/app/actions" // Importamos la Server Action que creamos antes

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [perfil, setPerfil] = useState<any>(null)
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

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
            {/* SECCIÓN 1: BIENVENIDA (La que ya tenías y funcionaba perfecto) */}
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 mb-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            ¡Hola, {perfil ? perfil.full_name : 'Usuario'}!
                        </h1>
                        <p className="text-slate-400">
                            Bienvenido a la gestión interna de Lunare JOYERÍA.
                        </p>
                    </div>
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

            {/* SECCIÓN 2: FORMULARIO CRUD (Solo lo ve el Administrador) */}
            {perfil?.role === 'admin' && (
                <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-blue-500/30">
                    <h2 className="text-2xl font-bold text-white mb-2">Gestión de Catálogo</h2>
                    <p className="text-slate-400 mb-6">Agrega nuevas joyas a la base de datos utilizando Server Actions.</p>

                    <form 
                        ref={formRef}
                        action={async (formData) => {
                            await crearJoya(formData);
                            formRef.current?.reset();
                            alert("¡Joya guardada exitosamente en la base de datos!");
                        }} 
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Título</label>
                                <input type="text" name="titulo" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" placeholder="Ej: Anillo Solitario" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Material</label>
                                <input type="text" name="material" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" placeholder="Ej: Plata 925" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Tipo</label>
                                <input type="text" name="tipo" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" placeholder="Ej: Anillo" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Precio ($)</label>
                                <input type="number" step="0.01" name="precio" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" placeholder="45.50" />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full">
                            Agregar al Catálogo
                        </button>
                    </form>
                </div>
            )}
        </main>
    )
}