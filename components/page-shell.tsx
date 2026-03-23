type Props = {
  children: React.ReactNode;
};

export function PageShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_22%),linear-gradient(180deg,#06101d_0%,#071325_45%,#08111f_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
    </main>
  );
}
