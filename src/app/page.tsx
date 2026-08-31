import Sidebar from "../components/blackxcross/Sidebar";
import TopBar from "../components/blackxcross/TopBar";
// import BrandHero from "../components/blackxcross/BrandHero";
import SearchFilterBar from "../components/blackxcross/SearchFilterBar";
import CaseCardsRow from "../components/blackxcross/CaseCardsRow";
import ActivityFeed from "../components/blackxcross/ActivityFeed";
import InvestigationsMap from "../components/blackxcross/InvestigationsMap";
import TrendingTheories from "../components/blackxcross/TrendingTheories";
import MemberSpotlight from "../components/blackxcross/MemberSpotlight";
import CtaBanner from "../components/blackxcross/CtaBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full ">
      <Sidebar />

      <main className="w-7/10 flex-1">
        <TopBar />
        {/* <BrandHero /> */}
        <SearchFilterBar />
        <CaseCardsRow />

        <div className="grid grid-cols-1 gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-3 lg:px-8">
          <ActivityFeed />
          <InvestigationsMap />
          <div className="flex flex-col gap-4">
            <TrendingTheories />
            <MemberSpotlight />
          </div>
        </div>

        <CtaBanner />
      </main>
    </div>
  );
}
