import Image from "next/image";
import Link from "next/link";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

async function getPokemon(): Promise<PokemonDetail[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });
  const data = await res.json();

  const details = await Promise.all(
    data.results.map(async (p: PokemonListItem) => {
      const r = await fetch(p.url, { next: { revalidate: 86400 } });
      return r.json();
    })
  );

  return details;
}

function spriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function PokeballIcon() {
  return (
    <svg width="69" height="69" viewBox="0 0 69 69" fill="none" className="w-16 h-16">
      <circle cx="34.5" cy="34.5" r="32" fill="#DC2626" stroke="#1F2937" strokeWidth="2"/>
      <circle cx="34.5" cy="34.5" r="32" fill="url(#gradient)" />
      <rect x="2.5" y="31.5" width="64" height="6" fill="#1F2937"/>
      <circle cx="34.5" cy="34.5" r="10" fill="white" stroke="#1F2937" strokeWidth="3"/>
      <circle cx="34.5" cy="34.5" r="5" fill="white" stroke="#1F2937" strokeWidth="2"/>
      <defs>
        <linearGradient id="gradient" x1="34.5" y1="2.5" x2="34.5" y2="66.5">
          <stop offset="0%" stopColor="#DC2626"/>
          <stop offset="50%" stopColor="#DC2626"/>
          <stop offset="50%" stopColor="white"/>
          <stop offset="100%" stopColor="white"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default async function Home() {
  const pokemon = await getPokemon();

  return (
    <div className="space-y-12">
      {/* Chat Interface Section */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-md w-full flex flex-col items-center gap-6">
          {/* Pokeball Logo */}
          <PokeballIcon />

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-medium text-gray-900">Hey &lt;user-name&gt;</h1>
            <p className="text-base text-gray-600">What do you want to build today?</p>
          </div>

          {/* Chat Input Box */}
          <div className="w-full bg-white border-2 border-[#D86C00] rounded-[20px] p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Start creating your vision</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Plus Button */}
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Magic Wand Button */}
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 2.5L10 6M6 10L2.5 13.5M11 5L6.5 9.5M4.5 4.5V6M4.5 4.5H6M4.5 4.5H3M4.5 4.5V3M11.5 11.5V13M11.5 11.5H13M11.5 11.5H10M11.5 11.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice Button */}
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="6.5" y="2" width="3" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8M8 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Send Button */}
                <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemon.map((p) => (
          <Link
            key={p.id}
            href={`/pokemon/${p.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col items-center gap-2 group"
          >
            <span className="text-xs text-gray-400 self-end">
              #{String(p.id).padStart(3, "0")}
            </span>
            <Image
              src={spriteUrl(p.id)}
              alt={p.name}
              width={120}
              height={120}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-semibold capitalize text-sm">{p.name}</span>
            <div className="flex gap-1">
              {p.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`text-xs text-white px-2 py-0.5 rounded-full ${typeColors[t.type.name] || "bg-gray-400"}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
