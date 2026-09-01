import Sidebar from "../components/blackxcross/Sidebar";
import TopBar from "../components/blackxcross/TopBar";
import SearchFilterBar from "../components/blackxcross/SearchFilterBar";
import CaseCardsRow from "../components/blackxcross/CaseCardsRow";
import ActivityFeed from "../components/blackxcross/ActivityFeed";
import InvestigationsMap from "../components/blackxcross/InvestigationsMap";
import TrendingTheories from "../components/blackxcross/TrendingTheories";
import MemberSpotlight from "../components/blackxcross/MemberSpotlight";
import CtaBanner from "../components/blackxcross/CtaBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="w-full min-w-0 flex-1">
        <TopBar />
        <SearchFilterBar />
        <CaseCardsRow />
        <div className="grid grid-cols-1 gap-4 px-4 pb-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <ActivityFeed />
          <InvestigationsMap />
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <TrendingTheories />
            <MemberSpotlight />
          </div>
        </div>
        <CtaBanner />
      </main>
    </div>
  );
}
