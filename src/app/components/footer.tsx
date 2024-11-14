
export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black py-5 text-white/60">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center text-xs">
@ {new Date().getFullYear()} Karthik Nishanth.
          </div>
        </div>
      </div>
    </footer>
  );
}