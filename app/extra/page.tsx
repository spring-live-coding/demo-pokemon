import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extra - Pokedex",
  description: "Extra Pokemon information",
};

export default function ExtraPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Extra Content</h1>
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
}
