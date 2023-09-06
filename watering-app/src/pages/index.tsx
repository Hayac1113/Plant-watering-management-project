import React from "react";
import SearchBar from "@/components/SearchBar";
import PlantList from "@/components/FetchingPlantListData";
import NavigationBar from "@/components/NavigationBar";
import BaseLayout from "@/components/BaseLayout";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-lime-200 font-teko">
      <div className="grid ">
        <BaseLayout children={undefined} />
        <PlantList />
      </div>
    </main>
  );
}
