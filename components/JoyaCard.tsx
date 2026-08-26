import Link from "next/link";

interface JoyaCardProps {
    id: number | string;
    titulo: string;
    material: string;
    tipo: string;
    precio: number;
}

export default function JoyaCard({ id, titulo, material, tipo, precio }: JoyaCardProps) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition-colors">
            <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                    {tipo}
                </span>
                <h2 className="text-xl font-bold text-white mt-4 mb-2">{titulo}</h2>
                <p className="text-slate-400 text-sm mb-4">{material}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-white">${precio.toFixed(2)}</span>
                <Link
                    href={`/joyas/${id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Ver detalles &rarr;
                </Link>
            </div>
        </div>
    );
}