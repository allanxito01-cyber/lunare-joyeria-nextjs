interface SearchBarProps {
    query: string;
    onQueryChange: (query: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
    return (
        <div className="mb-8">
            <input
                type="text"
                placeholder="Buscar por título, material o tipo..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
        </div>
    );
}