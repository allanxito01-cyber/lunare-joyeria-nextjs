import Link from "next/link";

export default function JoyaDetalle({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full text-center shadow-xl">
                <h1 className="text-2xl font-bold text-white mb-4">
                    Detalle de la Joya
                </h1>
                <p className="text-slate-400 mb-6">
                    Estás viendo la información ampliada del producto <br/> 
                    con el código interno: <span className="text-white font-bold text-lg">{params.id}</span>
                </p>
                
                <div className="bg-slate-900 p-4 rounded-lg mb-8 border border-slate-700/50">
                    <p className="text-sm text-slate-500 italic">
                        Nota: Las imágenes en 3D y especificaciones técnicas de esta pieza se habilitarán en la próxima versión del sistema.
                    </p>
                </div>

                <Link 
                    href="/" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                >
                    &larr; Volver al catálogo
                </Link>
            </div>
        </main>
    );
}