import React from "react";
import AppLayout from "../components/common/AppLayout";
import Map from "../components/Festival/Info/Map";
import BottomNav from "../components/common/BottomNav";
import FestivalHeader from "../components/Festival/Info/FestivalHeader";
import FestivalCarousel from "../components/Festival/Info/FestivalCarousel";
import FestivalSummary from "../components/Festival/Info/FestivalSummary";
import Recommend from "../components/Festival/Info/FestivalRecommend";



const FestivalDetailPage = () => {

  return (
    <>
    <AppLayout>
      <FestivalHeader/>
      <FestivalCarousel/>
      <FestivalSummary/>
      <Map/>
      <Recommend/>
      </AppLayout>
     <BottomNav/>
     </>
  );
}

export default FestivalDetailPage;