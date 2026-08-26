import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b border-slate-800 bg-slate-900">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white tracking-widest">
                    LUNARE
                </Link>
                <div className="flex gap-4 items-center">
                    <Link href="/login" className="text-slate-300 hover:text-white transition-colors text-sm">
                        Iniciar sesión
                    </Link>
                    <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                        Registrarse
                    </Link>
                </div>
            </div>
        </nav>
    );
}