"use client";

import { useState } from "react";
import JoyaCard from "@/components/JoyaCard";
import SearchBar from "@/components/SearchBar";

// Datos de prueba con el inventario real del catálogo
const joyas = [
    {
        id: 1,
        titulo: 'Cadena de 50 cm',
        material: 'Plata 925',
        tipo: 'Cadena',
        precio: 24.00
    },
    {
        id: 2,
        titulo: 'Anillo perla verde 7/2',
        material: 'Plata 925',
        tipo: 'Anillo',
        precio: 40.00
    },
    {
        id: 3,
        titulo: 'Pulsera de huella',
        material: 'Plata 925',
        tipo: 'Pulsera',
        precio: 25.00
    }
];

export default function Home() {
    // Estado para guardar lo que el usuario escribe en el buscador
    const [query, setQuery] = useState('');

    // Filtramos las joyas según la búsqueda (ignorando mayúsculas/minúsculas)
    const filtradas = joyas.filter((joya) => 
        joya.titulo.toLowerCase().includes(query.toLowerCase()) ||
        joya.material.toLowerCase().includes(query.toLowerCase()) ||
        joya.tipo.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-white mb-8">
                Catálogo Lunare JOYERÍA
            </h1>
            
            {/* Buscador interactivo */}
            <SearchBar query={query} onQueryChange={setQuery} />

            <p className="text-sm text-slate-400 mb-6">
                {filtradas.length} piezas encontradas
            </p>

            {/* Cuadrícula de resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtradas.map((joya) => (
                    <JoyaCard key={joya.id} {...joya} />
                ))}
            </div>

            {/* Mensaje si no hay resultados */}
            {filtradas.length === 0 && (
                <p className="text-slate-400 mt-6">
                    No se encontraron piezas para la búsqueda: <b>{query}</b>.
                </p>
            )}
        </main>
    )
}