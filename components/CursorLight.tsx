export default function CursorLight() {
  return (
    <div
      className="pointer-events-none fixed z-[0] mix-blend-screen"
      style={{
        left: '50%',
        bottom: '15%',
        width: '1200px',
        height: '1200px',
        transform: 'translate(-50%, 50%)',
      }}
    >
      <div className="w-full h-full bg-[radial-gradient(circle,_rgba(150,180,255,0.15)_0%,_rgba(150,180,255,0.1)_25%,_rgba(150,180,255,0.08)_50%,_transparent_75%)]" />
    </div>
  );
}
