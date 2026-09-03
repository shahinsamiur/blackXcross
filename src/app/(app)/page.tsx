import SearchFilterBar from "../../components/blackxcross/SearchFilterBar";
import CaseCardsRow from "../../components/blackxcross/CaseCardsRow";
import ActivityFeed from "../../components/blackxcross/ActivityFeed";
import InvestigationsMap from "../../components/blackxcross/InvestigationsMap";
import TrendingTheories from "../../components/blackxcross/TrendingTheories";
import CtaBanner from "../../components/blackxcross/CtaBanner";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 pb-8 sm:px-6 lg:px-8">
      <SearchFilterBar />
      <CaseCardsRow />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <ActivityFeed />
        <InvestigationsMap />
        <TrendingTheories />
      </div>
      <CtaBanner />
    </div>
  );
}
