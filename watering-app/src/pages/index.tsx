import React from "react";
import SearchBar from "@/components/SearchBar";
import PlantList from "@/components/FetchingPlantListData";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="">
        <SearchBar />
        <PlantList />
      </div>
    </main>
  );
}
