export default function Footer({ copyright }: { copyright: string }) {
  return (
    <footer className="py-12 border-t border-[#333] text-white">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm tracking-widest uppercase">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
