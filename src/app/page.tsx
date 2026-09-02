import SearchFilterBar from "../components/blackxcross/SearchFilterBar";
import CaseCardsRow from "../components/blackxcross/CaseCardsRow";
import ActivityFeed from "../components/blackxcross/ActivityFeed";
import InvestigationsMap from "../components/blackxcross/InvestigationsMap";
import TrendingTheories from "../components/blackxcross/TrendingTheories";
import MemberSpotlight from "../components/blackxcross/MemberSpotlight";
import CtaBanner from "../components/blackxcross/CtaBanner";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 pb-8 sm:px-6 lg:px-8">
      <SearchFilterBar />
      <CaseCardsRow />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0">
          <ActivityFeed />
        </div>
        <div className="min-w-0">
          <InvestigationsMap />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <TrendingTheories />
          <MemberSpotlight />
        </div>
      </div>
      <CtaBanner />
    </div>
  );
}
