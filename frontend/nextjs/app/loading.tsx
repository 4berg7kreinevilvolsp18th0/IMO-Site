export default function Loading() {
  return (
    <main className="min-h-screen bg-imo-deep text-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-imo-neon/20" />
          <div className="absolute inset-0 border-2 border-transparent border-t-imo-neon animate-spin" />
        </div>
        <p className="text-imo-neon/50 font-heading text-sm tracking-[0.2em] neon-glow">ЗАГРУЗКА</p>
      </div>
    </main>
  );
}
