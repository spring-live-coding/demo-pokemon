import Image from "next/image";
import Link from "next/link";

const typeColors: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const typeBadgeColors: Record<string, string> = {
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

function getCardBackground(types: { type: { name: string } }[]) {
  if (types.length === 1) {
    const color = typeColors[types[0].type.name] || typeColors.normal;
    return { background: color };
  } else if (types.length === 2) {
    const color1 = typeColors[types[0].type.name] || typeColors.normal;
    const color2 = typeColors[types[1].type.name] || typeColors.normal;
    return { background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` };
  }
  return { background: "#FFFFFF" };
}

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

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemon.map((p) => (
          <Link
            key={p.id}
            href={`/pokemon/${p.id}`}
            className="rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col items-center gap-2 group"
            style={getCardBackground(p.types)}
          >
            <span className="text-xs text-white/80 self-end font-semibold">
              #{String(p.id).padStart(3, "0")}
            </span>
            <Image
              src={spriteUrl(p.id)}
              alt={p.name}
              width={120}
              height={120}
              className="group-hover:scale-110 transition-transform drop-shadow-lg"
            />
            <span className="font-bold capitalize text-sm text-white">{p.name}</span>
            <div className="flex gap-1">
              {p.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`text-xs text-white px-2 py-0.5 rounded-full ${typeBadgeColors[t.type.name] || "bg-gray-400"}`}
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
