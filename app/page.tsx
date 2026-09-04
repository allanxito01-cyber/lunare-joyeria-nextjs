import { createClient } from '@supabase/supabase-js';
import JoyaCard from '@/components/JoyaCard';
import ApiExterna from '@/components/ApiExterna';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // Consulta REAL a tu tabla joyas de Supabase
  const { data: joyas, error } = await supabase.from('joyas').select('*');

  return (
    <main className="min-h-screen p-8 bg-slate-900">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Catálogo Lunare</h1>
      
      {/* Componente que consume la API externa de divisas */}
      <ApiExterna />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {joyas && joyas.length > 0 ? (
          joyas.map((joya) => (
            <JoyaCard 
              key={joya.id}
              id={joya.id}
              titulo={joya.titulo}
              material={joya.material}
              tipo={joya.tipo}
              precio={joya.precio}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-slate-400 p-8 border border-slate-700 rounded-lg">
            <p>El catálogo está vacío o la base de datos está en mantenimiento.</p>
          </div>
        )}
      </div>
    </main>
  );
}