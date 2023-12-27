import Navbar from "./_components/Navbar";

function TasteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full">
      <Navbar />
      <div className="w-full overflow-y-scroll no-scrollbar">{children}</div>
    </main>
  );
}

export default TasteLayout;
