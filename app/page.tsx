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

export default async function Home() {
  const pokemon = await getPokemon();

  // Simulated user-provided search query (XSS vulnerability: innerHTML with unsanitized input)
  const searchQuery = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('q') || ''
    : '';

  return (
    <div>
      <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-sm">
        Showing results for: <b>{searchQuery}</b>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemon.map((p) => (
          <Link
            key={p.id}
            href={`/pokemon/${p.id}`}
            className="bg-blue-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col items-center gap-2 group"
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
