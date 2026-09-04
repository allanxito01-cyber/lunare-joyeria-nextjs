'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function crearJoya(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const material = formData.get('material') as string;
  const tipo = formData.get('tipo') as string;
  const precio = parseFloat(formData.get('precio') as string);

  const { data, error } = await supabase
    .from('joyas')
    .insert([{ titulo, material, tipo, precio }]);

  if (error) throw new Error('Error al crear la joya');

  // Refresca la página principal para mostrar el nuevo producto
  revalidatePath('/');
  revalidatePath('/dashboard');
}