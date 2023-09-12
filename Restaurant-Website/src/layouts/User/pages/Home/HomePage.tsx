"use client";

import MostSeller from "../../components/MostSeller/MostSeller";
import Menu from "./Menu";
// import Navbar from "../../components/Header/Navbar";
import SlidingInterval from "../../components/Carousel/Slider";

export default function HomePage() {
  return (
    <div>
      <div className="w-full h-[440px]">
        <SlidingInterval />
      </div>
      {/* <Navbar /> */}
      <MostSeller />
      <Menu />
    </div>
  );
}
