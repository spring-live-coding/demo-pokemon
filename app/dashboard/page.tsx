import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pokedex",
  description: "Pokedex Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Pokédex Dashboard</h1>
        <p className="text-gray-600">A stats overview of the original 151 Pokémon.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">Total Pokémon</p>
          <div className="text-3xl font-bold text-gray-900">151</div>
          <p className="text-sm text-gray-600 mt-1">Generation I</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">Most Common Type</p>
          <div className="text-3xl font-bold text-gray-900">33</div>
          <p className="text-sm text-gray-600 mt-1">poison (33 Pokémon)</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">Dual-Type</p>
          <div className="text-3xl font-bold text-gray-900">66</div>
          <p className="text-sm text-gray-600 mt-1">Have 2 types</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">Legendaries</p>
          <div className="text-3xl font-bold text-gray-900">5</div>
          <p className="text-sm text-gray-600 mt-1">Articuno, Zapdos, Moltres, Mewtwo, Mew</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* Pokemon by Type Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Pokémon by Type</h3>
          <div className="flex gap-4">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-72 text-xs text-gray-500 pr-2">
              <span>36</span>
              <span>27</span>
              <span>18</span>
              <span>9</span>
              <span>0</span>
            </div>
            {/* Chart bars */}
            <div className="flex-1 h-72 flex items-end justify-between gap-3 px-2">
              {[
                { type: 'poison', count: 33, height: '258px', color: 'bg-purple-500' },
                { type: 'water', count: 32, height: '250px', color: 'bg-blue-500' },
                { type: 'normal', count: 22, height: '172px', color: 'bg-gray-400' },
                { type: 'flying', count: 19, height: '150px', color: 'bg-sky-300' },
                { type: 'grass', count: 14, height: '109px', color: 'bg-green-500' },
                { type: 'ground', count: 14, height: '109px', color: 'bg-yellow-600' },
                { type: 'psychic', count: 14, height: '109px', color: 'bg-pink-500' },
                { type: 'fire', count: 12, height: '95px', color: 'bg-orange-500' },
                { type: 'bug', count: 12, height: '95px', color: 'bg-lime-500' },
                { type: 'rock', count: 11, height: '86px', color: 'bg-yellow-700' },
                { type: 'electric', count: 9, height: '72px', color: 'bg-yellow-400' },
                { type: 'fighting', count: 8, height: '63px', color: 'bg-red-700' },
                { type: 'ice', count: 5, height: '40px', color: 'bg-cyan-300' },
                { type: 'fairy', count: 4, height: '32px', color: 'bg-pink-300' },
                { type: 'ghost', count: 3, height: '24px', color: 'bg-purple-700' },
                { type: 'dragon', count: 3, height: '24px', color: 'bg-indigo-600' },
                { type: 'steel', count: 2, height: '16px', color: 'bg-gray-400' },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 min-w-[40px]">
                  <div
                    className={`w-full ${item.color} rounded-t-md`}
                    style={{ height: item.height, minWidth: '32px' }}
                  ></div>
                  <span className="text-[10px] text-gray-500 -rotate-45 origin-top-left mt-4 whitespace-nowrap">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spotlight Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4 self-start flex items-center gap-2">
            <span className="text-yellow-500">✨</span> Spotlight
          </h3>
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <div className="text-6xl">🧬</div>
          </div>
          <p className="text-sm text-gray-500">#150</p>
          <h4 className="text-xl font-bold text-gray-900 mb-1">Mewtwo</h4>
          <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full mb-4">psychic</span>
          <p className="text-sm text-gray-600 text-center mb-6">
            The most powerful Pokémon ever created through genetic engineering.
          </p>
          <button className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Browse all Pokémon →
          </button>
        </div>
      </div>

      {/* Type Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Type Distribution</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { name: 'poison', count: 33, bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-500' },
            { name: 'water', count: 32, bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-500' },
            { name: 'normal', count: 22, bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700', badge: 'bg-gray-400' },
            { name: 'flying', count: 19, bg: 'bg-sky-100', border: 'border-sky-300', text: 'text-sky-700', badge: 'bg-sky-300' },
            { name: 'grass', count: 14, bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' },
            { name: 'ground', count: 14, bg: 'bg-yellow-100', border: 'border-yellow-600', text: 'text-yellow-800', badge: 'bg-yellow-600' },
            { name: 'psychic', count: 14, bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-700', badge: 'bg-pink-500' },
            { name: 'fire', count: 12, bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-500' },
            { name: 'bug', count: 12, bg: 'bg-lime-100', border: 'border-lime-500', text: 'text-lime-700', badge: 'bg-lime-500' },
            { name: 'rock', count: 11, bg: 'bg-yellow-100', border: 'border-yellow-700', text: 'text-yellow-800', badge: 'bg-yellow-700' },
            { name: 'electric', count: 9, bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-400' },
            { name: 'fighting', count: 8, bg: 'bg-red-100', border: 'border-red-700', text: 'text-red-800', badge: 'bg-red-700' },
            { name: 'ice', count: 5, bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700', badge: 'bg-cyan-300' },
            { name: 'fairy', count: 4, bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-600', badge: 'bg-pink-300' },
            { name: 'ghost', count: 3, bg: 'bg-purple-50', border: 'border-purple-700', text: 'text-purple-800', badge: 'bg-purple-700' },
            { name: 'dragon', count: 3, bg: 'bg-indigo-50', border: 'border-indigo-600', text: 'text-indigo-700', badge: 'bg-indigo-600' },
            { name: 'steel', count: 2, bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-600', badge: 'bg-gray-400' },
          ].map((type, i) => (
            <div key={i} className={`${type.bg} border-2 ${type.border} rounded-full px-4 py-2 flex items-center gap-2`}>
              <div className={`w-2.5 h-2.5 rounded-full ${type.badge}`}></div>
              <span className={`text-sm capitalize ${type.text} font-medium`}>{type.name}</span>
              <span className={`${type.badge} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>{type.count}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <div><span className="font-semibold text-gray-900">Single-type:</span> 85</div>
          <div><span className="font-semibold text-gray-900">Dual-type:</span> 66</div>
          <div><span className="font-semibold text-gray-900">Unique types:</span> 17</div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Fun Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { emoji: '⚡', text: 'Pikachu (#25) is the mascot of the entire franchise.' },
            { emoji: '🌊', text: 'Water is the most represented type in Gen 1 with 32 Pokémon.' },
            { emoji: '😴', text: 'Snorlax (#143) weighs 1,014 lbs — the heaviest Gen 1 Pokémon.' },
            { emoji: '👻', text: 'Gengar (#94) is the only pure Ghost-type evolution line in Gen 1.' },
            { emoji: '🧬', text: 'Ditto (#132) can transform into any Pokémon it sees.' },
            { emoji: '🐉', text: 'Dragonite (#149) was the first Dragon-type in the series.' },
          ].map((fact, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 flex gap-3">
              <div className="text-2xl flex-shrink-0">{fact.emoji}</div>
              <p className="text-sm text-gray-700">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
