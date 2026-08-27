export default async function ApiExterna() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
    const data = await res.json();
    return (
      <div className="bg-slate-800 p-4 rounded-lg text-center text-white text-sm my-6 border border-blue-500">
        💱 <b>Datos en vivo (API Externa):</b> 1 USD = {data.rates.EUR} Euros | {data.rates.GBP} Libras
      </div>
    );
  } catch (error) {
    return <p>Error al cargar la API.</p>;
  }
}