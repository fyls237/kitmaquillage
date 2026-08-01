"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-black text-white px-5 py-2.5 text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
    >
      🖨️ Imprimer
    </button>
  );
}
