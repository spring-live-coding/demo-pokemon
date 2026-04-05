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

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

function spriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const statColors: Record<string, string> = {
  hp: "bg-green-500",
  attack: "bg-red-500",
  defense: "bg-orange-400",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-purple-500",
  speed: "bg-yellow-400",
};

async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 86400 },
  });
  return res.json();
}

export async function generateStaticParams() {
  return Array.from({ length: 151 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);
  return { title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokedex` };
}

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);
  const pokemonId = pokemon.id;

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 mb-6 text-sm font-medium"
      >
        &larr; Back to Pokedex
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8">
            <Image
              src={spriteUrl(pokemonId)}
              alt={pokemon.name}
              width={280}
              height={280}
              priority
            />
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex items-baseline gap-3 mb-4">
              <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
              <span className="text-gray-400 text-xl">
                #{String(pokemonId).padStart(3, "0")}
              </span>
            </div>

            <div className="flex gap-2 mb-6">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`text-sm text-white px-3 py-1 rounded-full ${typeColors[t.type.name] || "bg-gray-400"}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Height</div>
                <div className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Weight</div>
                <div className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className="bg-gray-100 px-3 py-1 rounded-lg text-sm capitalize"
                  >
                    {a.ability.name.replace("-", " ")}
                    {a.is_hidden && (
                      <span className="text-gray-400 text-xs ml-1">(hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Base Stats
              </h2>
              <div className="space-y-2">
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {statLabels[s.stat.name] || s.stat.name}
                    </span>
                    <span className="text-sm font-mono w-8 text-right">
                      {s.base_stat}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${statColors[s.stat.name] || "bg-gray-400"}`}
                        style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {pokemonId > 1 && (
          <Link
            href={`/pokemon/${pokemonId - 1}`}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            &larr; Previous
          </Link>
        )}
        <div />
        {pokemonId < 151 && (
          <Link
            href={`/pokemon/${pokemonId + 1}`}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Next &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
