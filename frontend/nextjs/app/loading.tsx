export default function Loading() {
  return (
    <main className="min-h-screen bg-imo-deep text-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-imo-ocean/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-imo-sky animate-spin" />
        </div>
        <p className="text-white/50 font-heading text-sm tracking-[0.2em]">ЗАГРУЗКА</p>
      </div>
    </main>
  );
}
