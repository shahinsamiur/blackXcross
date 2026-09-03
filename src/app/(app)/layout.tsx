import Sidebar from "../../components/blackxcross/Sidebar";
import TopBar from "../../components/blackxcross/TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <TopBar />
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
